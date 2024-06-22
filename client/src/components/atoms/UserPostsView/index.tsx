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
import { DeletePostDTO, UpdatePostDTO, deletePost, updatePost, viewJourney } from '@/api/requests';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, Button, Modal } from '@mui/material';
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
	border: '2px solid #000',
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

	const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();

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
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
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
				loginWithRedirect();
			}
		});
		props.setTrigger(!props.trigger);

	};

	const editPost = async(postId:number)=>{
		if(newText == '') return;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
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
				loginWithRedirect();
			}
		});
	};

	const deletePostAndJourney = async(postId:number)=>{
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
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
				loginWithRedirect();
			}
		});
		props.setTrigger(!props.trigger);

	};
	return (
		<>
			{isAuthenticated && (        
				props.posts?.map((post)=>{
					return(
						<>
							<Card sx={{ maxWidth: 345, mt:10 }}>
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
									{post.reactions?.length}
									<FavoriteIcon />
									{post.journeyId !== 0 && (
										<IconButton onClick={()=>handleExpandClick(post!.id!, post!.journeyId!)}>
											<ExpandMoreIcon />
										</IconButton>
									)}
									<IconButton aria-label='delete-post' onClick={()=>{setDeleting(true); setSelectedPost(post);}}>
										<DeleteForever />
									</IconButton>
									<IconButton aria-label="like" onClick={()=>{setEditing(true); setSelectedPost(post);}}>
										<Edit />
									</IconButton>
								</CardActions>
								<Collapse in={expandedId === post.id} timeout="auto" unmountOnExit>
									<CardContent>
								date: {journey?.date?.toString()}
							fastest: { journey?.fastest}
							slowest: {journey?.slowest}
							totalKm: {journey?.totalKm}
							passed: {journey?.totalPasses}
									</CardContent>
								</Collapse>
							</Card>
						</>
				
					);})
			)};
			<Modal
				open={deleting}
				onClose={()=>setDeleting(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure that you want to delete this post and its related journey? 
					</Typography>
					<Button onClick={()=>{deletePostById(selectedPost!.id!);}}>Delete post</Button>
					<Button onClick={()=>{deletePostAndJourney(selectedPost!.id!);}}>Delete post and journey</Button>
					<Button onClick={()=>setDeleting(false)}>Cancel</Button>								
				</Box>
			</Modal>
			<Modal
				open={editing}
				onClose={()=>setEditing(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box  sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
                                You can edit your post below:
					</Typography>
					<TextareaAutosize placeholder={selectedPost?.text} onChange={(e)=>{setNewText(e.target.value);}}/>

					<Button onClick={()=>{editPost(selectedPost!.id!);}}>Save changes</Button>								
				</Box> 
			</Modal>
		</>
	);
};

export default UserPostsView;

