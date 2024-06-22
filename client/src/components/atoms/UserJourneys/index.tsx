/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Journey } from '@/api/types';
import { deleteJourney } from '@/api/requests';
import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Modal, Paper } from '@mui/material';
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
	border: 1, 
	borderColor: 'pink', 
	borderRadius: '16px',
	boxShadow: 24,
	p: 4,
};
  
const UserJourneysView = (props:Props) => {
	const [deleting, setDeleting] = React.useState<boolean>(false);
	const [expandedId, setExpandedId] = React.useState<number>(0);

	const {  getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();

	const deleteJourneyAndPost = async(journeyId:number)=>{
		// @ts-ignore

		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			// @ts-ignore

			loginWithRedirect();
		});

		if(!token) return;

		await deleteJourney(journeyId, token)
			.then(()=>{
				props.setTrigger(!props.trigger);
				setDeleting(false);
			}).catch((e)=>{
				if(e.response.status === 401){
					// @ts-ignore					
					loginWithRedirect();
				}
			});
	};
	return (
		<Box>
			<Typography
				sx={{
					ml: 2,
					mt:2,
					fontFamily: 'monospace',
					fontSize: 24,
					fontWeight: 800,
					letterSpacing: '.1rem',
					color: 'teal',
				}}
			> My journeys:
			</Typography>
			<Paper style={{maxHeight: '450px', overflow: 'auto', paddingLeft:20}}>    

				{props.journeys.length>0 &&  (    
					props.journeys.map((journey)=>{
						return(
							<Card key={journey.id} sx={{ maxWidth: 345, mt: 2 }} area-label='journey-card'>
								<Typography sx={{ml:2,
									fontFamily: 'monospace',
									fontSize: 18,
									fontWeight: 700,
									color: 'black',}}
								>{`${journey.date.toString()} - ${journey.type.toLowerCase().toString()}`}
								</Typography>
								<CardContent>
									<Typography variant="body2" color="black">
									fastest:{journey.fastest} <br/>
                                    slowest: {journey.slowest}<br/>
                                    totalPasses: {journey.totalPasses}<br/>
                                    totalKm: {journey.totalKm}<br/>
									</Typography>
								</CardContent>
								<CardActions disableSpacing>						
									<IconButton sx={{color:'teal', ml:36}}aria-label="like" onClick={()=>{setExpandedId(journey.id); setDeleting(true);}}>
										<DeleteForever />
									</IconButton>								
								</CardActions>
							</Card>
				
						);})
				)}
			</Paper>
			<Modal
				open={deleting}
				onClose={()=>setDeleting(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						sx={{
							ml:2,
							fontFamily: 'monospace',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: 'teal',
						}}>Are you sure that you want to delete this journey and its related post? 
					</Typography>				
					<Button sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', mt:2, ml:4}} onClick={()=>{deleteJourneyAndPost(expandedId!);}}>Delete journey and post</Button>
					<Button sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', ml:4, mt:2}} onClick={()=>setDeleting(false)}>Cancel</Button>								
				</Box>
			</Modal>
	
		</Box>
	);
};

export default UserJourneysView;

