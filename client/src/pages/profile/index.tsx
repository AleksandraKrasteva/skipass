import { DeletePostsDTO, deleteJourneysForUser, deletePostsForUser, deleteReactions, getReactionsForUser, viewJourneysForUser, viewPostsForUser } from '@/api/requests';
import { Post, Journey, Reaction } from '@/api/types';
import Footer from '@/components/atoms/Footer';
import JourneyTable from '@/components/atoms/JourneyTable';
import LikesTable from '@/components/atoms/LikesTable';
import PostTable from '@/components/atoms/PostTable';
import UserProfile from '@/components/atoms/UserProfile';
import Navigation from '@/components/molecultes/Navigation';
import useConditionalAuth from '@/config/conditionalAuth';
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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

const Profile = () => {
	const [viewPosts, setViewPosts] = useState<boolean>(false);
	const [viewJourneys, setViewJourneys] = useState<boolean>(false);  
	const [viewLikes, setViewLikes] = useState<boolean>(false); 
	const [posts, setPosts] = useState<Post[]>([]);
	const [journeys, setJourneys ] = useState<Journey[]>([]);
	const [likes, setLikes] = useState<Reaction[]>([]); 
	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();
	
	const [delPosts, setDelPosts] = useState<boolean>(false);
	const [delLikes,setDelLikes] = useState<boolean>(false);
	const [delJourneys, setDelJourneys] = useState<boolean>(false); 
	const [trigger, setTrigger] = useState<boolean>(false);

	useEffect(()=>{
		if(!isAuthenticated) return;
		setUp();
	},[trigger]);


	const setUp=async()=>{
		const token = await getToken(); 
		if(!token) return;
		getPosts();
		getJourneys(token);
		getLikes(token);
	};

	const getToken=async()=>{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			loginWithRedirect();
		});
		return token;
	};

	const getPosts=async()=>{
		await viewPostsForUser(user!.nickname!).then((res)=>{
			setPosts(res.data);
		});
	};
	const getJourneys=async(token:string)=>{
		await viewJourneysForUser(user!.nickname!, token).then((res)=>{
			setJourneys(res.data);
		});
	};
	const getLikes=async(token:string)=>{
		await getReactionsForUser(user!.nickname!, token).then((res)=>{
			setLikes(res.data);
		});
	};

	const deleteJourneys=async()=>{
		const token = await getToken(); 
		if (!token) return;
		await deleteJourneysForUser(user!.nickname!, token); 
		setTrigger(!trigger);
		setDelJourneys(false);
	};

	const deletePosts=async()=>{
		const token = await getToken(); 
		if (!token)  return; 
		const request : DeletePostsDTO = {username: user!.nickname!, deleteJourney: false};
		await deletePostsForUser(request, token); 
		setTrigger(!trigger);
		setDelPosts(false);
	};

	const deleteLikes=async ()=>{
		const token = await getToken(); 
		if (!token) return;
		await deleteReactions(user!.nickname!, token);
		setTrigger(!trigger);
		setDelLikes(false);
	};
	
	return (
		<>
			<Navigation/>
			
			<UserProfile/>
			<h1>Stored personal information</h1>
			<ButtonGroup size="large" aria-label="Large button group">
				<Button sx={{color: 'red'}} onClick={()=>{setDelPosts(true);}}>Delete all Posts</Button>
				<Button sx={{color: 'red'}} onClick={()=>{setDelJourneys(true);}}>Delete all Journeys</Button>
				<Button sx={{color: 'red'}} onClick={()=>{setDelLikes(true);}}>Delete all Likes</Button>
			</ButtonGroup> 
			<br/>
			<ButtonGroup size="large" aria-label="Large button group">
				<Button onClick={()=>{setViewPosts(true); setViewJourneys(false);
					setViewLikes(false);}}>All Posts</Button>
				<Button onClick={()=>{setViewPosts(false); setViewJourneys(true);
					setViewLikes(false);}}>Journeys</Button>
				<Button onClick={()=>{setViewPosts(false); setViewJourneys(false);
					setViewLikes(true);}}>Likes</Button>
			</ButtonGroup> 
			<Modal
				open={delJourneys}
				onClose={()=>setDelJourneys(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography sx={{color: 'red'}}id="modal-modal-title" variant="h6" component="h2">
                                Are you sure that you want to delete all of your journeys?. This action can not be undone.
					</Typography>
					<Button onClick={()=>{deleteJourneys();}}>Delete</Button>
					<Button onClick={()=>setDelJourneys(false)}>Cancel</Button>								
				</Box>
			</Modal>
			<Modal
				open={delLikes}
				onClose={()=>setDelLikes(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography sx={{color:'red'}}id="modal-modal-title" variant="h6" component="h2">
                                Are you sure that you want to delete all of your likes? This action can not be undone. 
					</Typography>
					<Button onClick={()=>{deleteLikes();}}>Delete</Button>
					<Button onClick={()=>setDelLikes(false)}>Cancel</Button>								
				</Box>
			</Modal>
			<Modal
				open={delPosts}
				onClose={()=>setDelPosts(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography sx={{color: 'red'}} id="modal-modal-title" variant="h6" component="h2">
                                Are you sure that you want to delete all of your posts? This action can not be undone. 
					</Typography>
					<Button onClick={()=>{deletePosts();}}>Delete</Button>
					<Button onClick={()=>setDelPosts(false)}>Cancel</Button>								
				</Box>
			</Modal>		
			
			{viewPosts && <PostTable posts={posts}/>}
			{viewJourneys && <JourneyTable journeys={journeys}/>}
			{viewLikes && <LikesTable likes={likes}/>}
			<Footer/>
		</>
	);
};

export default Profile;