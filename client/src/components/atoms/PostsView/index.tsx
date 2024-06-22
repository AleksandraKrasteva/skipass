import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Journey, Post } from '@/api/types';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactionDTO, createReaction, deleteReaction, viewJourney } from '@/api/requests';
import { Paper } from '@mui/material';

type Props = {
    posts:Post[];
	trigger: boolean;
	setTrigger: (value: boolean) => void;
}

const PostsView = (props:Props) => {
	const [expandedId, setExpandedId] = React.useState<number>(0);
	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
	const [journey, setJourney] = React.useState<Journey>();

	const handleExpandClick = async (postId: number, journeyId: number ) => {
		if(expandedId === postId){setExpandedId(0);
			setJourney(undefined);
		}
		else{
			setExpandedId(postId); 
			console.log(journeyId);
			if(journeyId !== 0){
				const res = await viewJourney(journeyId);
				console.log(res);
				if (res.data){
					setJourney(res.data);
				}	
			}
		}
	};
	const likePost= async(postId:number)=>{
		if(!isAuthenticated){loginWithRedirect();}

		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			loginWithRedirect();
		});

		if(!token) return;

		const selected = props.posts.filter((x:Post)=>x.id === postId);

		if(!selected[0].reactions?.map((x)=>x.creator).includes(user!.nickname!)){
			const data: ReactionDTO = {
				postId: postId,
				creator: user!.nickname!
			};
			await createReaction(data, token).then(()=>{
				props.setTrigger(!props.trigger);
			})
				.catch((e)=>{
					console.log(e);
					if(e.response.status === 401){
						loginWithRedirect();
					}
				});
		}else{
			const reaction = selected[0].reactions?.filter((x)=>x.creator === user?.nickname && x.postId === postId );
			await deleteReaction(reaction[0].id, token).then(()=>{
				props.setTrigger(!props.trigger);
			}).catch((e)=>{console.log(e);});
		}

	};

	return (
		<Paper style={{maxHeight: '850px', overflow: 'auto', padding:20, marginTop:10}}>
			{props.posts.map((post)=>{
				return(
					<Card sx={{ maxWidth: 345, mt:10 }} key={post.id}>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
								</Avatar>
							}
							title={post.username}
						/>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{post.text}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton aria-label="like" onClick={()=>likePost(post.id!)}>
								{post.reactions?.length}
								<FavoriteIcon />
							</IconButton>
							{post.journeyId !== 0  && (
								<IconButton onClick={()=>handleExpandClick(post.id!, post!.journeyId!)}>
									<ExpandMoreIcon />
								</IconButton>
							)
							}
						</CardActions>
						<Collapse in={ expandedId === post.id} timeout="auto" unmountOnExit>
							<CardContent>
							date: {journey?.date?.toString()} <br/>
							fastest: { journey?.fastest}<br/>
							slowest: {journey?.slowest} <br/>
							totalKm: {journey?.totalKm}<br/>
							passed: {journey?.totalPasses} <br/>
							</CardContent>
						</Collapse>
					</Card>
				);})}
		</Paper>
	);
};

export default PostsView;

