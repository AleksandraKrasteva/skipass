import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Journey } from '@/api/types';
import { deleteJourney } from '@/api/requests';
import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Modal } from '@mui/material';
import useConditionalAuth from '@/config/conditionalAuth';

type Props = {
    journeys:Journey[];
	trigger: boolean;
	setTrigger: (value: boolean) => void;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
  
const UserJourneysView = (props:Props) => {
	const [deleting, setDeleting] = React.useState<boolean>(false);

	console.log(props.journeys);

	const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();

	const deleteJourneyAndPost = async(journeyId:number)=>{
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			loginWithRedirect();
		});

		if(!token) return;

		await deleteJourney(journeyId, token)
			.then(()=>{
				props.setTrigger(!props.trigger);
				setDeleting(false);
			}).catch((e)=>{
				console.log(e);
				if(e.response.status === 401){
					loginWithRedirect();
				}
			});
	};
	return (
		<Box>
			<h1>My journeys</h1>
			{isAuthenticated && props.journeys.length>0 &&  (    
				props.journeys.map((journey)=>{
					return(
						<Card key={journey.id} sx={{ maxWidth: 345, mt:10 }} area-label='journey-card'>
							<CardHeader
								title={`${journey.date.toString()} - ${journey.type.toLowerCase().toString()}`}
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									fastest:{journey.fastest}
                                    slowest: {journey.slowest}
                                    totalPasses: {journey.totalPasses}
                                    totalKm: {journey.totalKm}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>						
								<IconButton aria-label="like" onClick={()=>setDeleting(true)}>
									<DeleteForever />
								</IconButton>								
								<Modal
									open={deleting}
									onClose={()=>setDeleting(false)}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure that you want to delete this journey and its related post? 
										</Typography>
										<Button onClick={()=>{deleteJourneyAndPost(journey.id!);}}>Delete journey and post</Button>
										<Button onClick={()=>setDeleting(false)}>Cancel</Button>								
									</Box>
								</Modal>
							</CardActions>
						</Card>
				
					);})
			)}
		</Box>
	);
};

export default UserJourneysView;

