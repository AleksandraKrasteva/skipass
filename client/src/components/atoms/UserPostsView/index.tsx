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
import { DeletePostDTO, UpdatePostDTO, deletePost, updatePost, viewJourney } from '@/api/requests';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Modal, Paper } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import useConditionalAuth from '@/config/conditionalAuth';

type Props = {
    posts:Post[];
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
  
const UserPostsView = (props:Props) => {
	const [deleting, setDeleting] = React.useState<boolean>(false);
	const [editing, setEditing] = React.useState<boolean>(false);
	const [newText, setNewText] = React.useState<string>('');
	const [expandedId, setExpandedId] = React.useState<number>(0);
	const [journey, setJourney] = React.useState<Journey>();
	const [selectedPost, setSelectedPost] = React.useState<Post>();

	const { user, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();

	const handleExpandClick = async (postId: number, journeyId: number ) => {
		if(expandedId === postId){
			setExpandedId(0);
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

	const deletePostById = async(id:number)=>{
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

		const data: DeletePostDTO ={
			postId:  id,
			deleteJourney: false
		};

		await deletePost(data, token).then(()=>{
			props.setTrigger(!props.trigger);
		}).catch((e)=>{
			console.log(e);
			if(e.response.status === 401){
				// @ts-ignore
				loginWithRedirect();
			}
		});
		props.setTrigger(!props.trigger);

	};

	const editPost = async(postId:number)=>{
		if(newText == '') return;
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
		const data : UpdatePostDTO = {
			postId: postId,
			text: newText,
		};
		await updatePost(data, token).then(()=>{
			props.setTrigger(!props.trigger);
			setEditing(false);
		}).catch((e)=>{
			console.log(e);
			if(e.response.status === 401){
				// @ts-ignore

				loginWithRedirect();
			}
		});
	};

	const deletePostAndJourney = async(postId:number)=>{
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
		const data: DeletePostDTO ={
			postId: postId,
			deleteJourney: true
		};

		await deletePost(data, token).then(()=>{
			props.setTrigger(!props.trigger);
		}).catch((e)=>{
			console.log(e);
			if(e.response.status === 401){
				// @ts-ignore
				loginWithRedirect();
			}
		});
		props.setTrigger(!props.trigger);

	};
	return (
		<>
			<Paper style={{maxHeight: '250px', overflow: 'auto', paddingLeft:20}}>    
				{props.posts?.map((post)=>{
					return(
						<>
							<Card sx={{ maxWidth: 345, mt:2 }}>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe">
											{user?.nickname?.substring(0,1).toUpperCase()}
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
									<IconButton sx={{color:'black'}}>
										{post.reactions?.length}
										<FavoriteIcon sx={{color:'pink'}}/>
									</IconButton>
									
									{post.journeyId !== 0 && (
										<IconButton sx={{color:'black'}} onClick={()=>handleExpandClick(post!.id!, post!.journeyId!)}>
											<ExpandMoreIcon />
										</IconButton>
									)}
									<IconButton sx={{color:'black', ml:24}} aria-label='delete-post' onClick={()=>{setDeleting(true); setSelectedPost(post);}}>
										<DeleteForever />
									</IconButton>
									<IconButton aria-label="like" sx={{color:'black'}} onClick={()=>{setEditing(true); setSelectedPost(post);}}>
										<Edit />
									</IconButton>
								</CardActions>
								<Collapse in={expandedId === post.id} timeout="auto" unmountOnExit>
									<CardContent>
							date: {journey?.date?.toString()} <br/>
							fastest: { journey?.fastest}<br/>
							slowest: {journey?.slowest} <br/>
							totalKm: {journey?.totalKm}<br/>
							passed: {journey?.totalPasses} <br/>
									</CardContent>
								</Collapse>
							</Card>
						</>
				
					);})
				}
			</Paper>

			<Modal
				open={deleting}
				onClose={()=>setDeleting(false)}
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
						}}>Are you sure that you want to delete this post and its related journey? 
					</Typography>
					<ButtonGroup orientation="vertical" sx={{ml:11}} >
						<Button variant="contained" sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', mt:2}}  onClick={()=>{deletePostById(selectedPost!.id!);}}>Delete post</Button>
						<Button variant="contained" sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', mt:2}}  onClick={()=>{deletePostAndJourney(selectedPost!.id!);}}>Delete post and journey</Button>
						<Button variant="contained" sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', mt:2}}  onClick={()=>setDeleting(false)}>Cancel</Button>								
					</ButtonGroup>
				</Box>
			</Modal>
			<Modal
				open={editing}
				onClose={()=>setEditing(false)}
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
							letterSpacing: '.3rem',
							color: 'teal',
						}}>You can edit your post below: 
					</Typography>
					<TextareaAutosize placeholder={selectedPost?.text} onChange={(e)=>{setNewText(e.target.value);}}/><br/>

					<Button variant="contained" sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', ml:16}}  onClick={()=>{editPost(selectedPost!.id!);}}>Save changes</Button>								
				</Box> 
			</Modal>
		</>
	);
};

export default UserPostsView;

