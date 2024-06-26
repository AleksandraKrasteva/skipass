/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
			if(journeyId !== 0){
				const res = await viewJourney(journeyId);
				if (res.data){
					setJourney(res.data);
				}	
			}
		}
	};
	const likePost= async(postId:number)=>{
		// @ts-ignore

		if(!isAuthenticated){loginWithRedirect();}
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
					if(e.response.status === 401){
						// @ts-ignore
						loginWithRedirect();
					}
				});
		}else{
			const reaction = selected[0].reactions?.filter((x)=>x.creator === user?.nickname && x.postId === postId );
			await deleteReaction(reaction[0].id, token).then(()=>{
				props.setTrigger(!props.trigger);
			}).catch(()=>{});
		}

	};

	return (
		<Paper style={{maxHeight: '525px', overflow: 'auto', paddingLeft:20}}>
			{props.posts.map((post)=>{
				return(
					<Card sx={{ maxWidth: 345, mt:2, mb:2, ml:2 }} key={post.id}>
						<CardHeader
							avatar={
								<Avatar aria-label="recipe">
									{post.username.substring(0,1).toUpperCase()}
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
							<IconButton aria-label="like" sx={{color: 'black'}} onClick={()=>likePost(post.id!)}>
								{post.reactions?.length}
								<FavoriteIcon sx={{color:'pink'}} />
							</IconButton>
							{post.journeyId !== 0  && (
								<IconButton sx={{ml:30}} onClick={()=>handleExpandClick(post.id!, post!.journeyId!)}>
									<ExpandMoreIcon sx={{color: 'black'}} />
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

