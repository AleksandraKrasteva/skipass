/* eslint-disable no-mixed-spaces-and-tabs */
import { createPost, viewJourneysForUser, viewPostsForUser } from '@/api/requests';
import { Journey, Post } from '@/api/types';
import { Box, TextField, Button, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import UserPostsView from '@/components/atoms/UserPostsView';
import Navigation from '@/components/molecultes/Navigation';
import Footer from '@/components/atoms/Footer';
import useConditionalAuth from '@/config/conditionalAuth';

const MyPosts = () => {

	const [postText, setPostText] = useState<string>(''); 
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);
	const [journeysForUser, setJourneysForUser] = useState<Journey[]>([]);

	const [trigger, setTrigger] = useState<boolean>(false);

	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();

	const [selectedJourneyId, setSelectedJourneyId] = useState<string>('');

	const handleChangeJourney = (event: SelectChangeEvent) => {
		setSelectedJourneyId(event.target.value);
	};

	useEffect(() => {    
		console.log('Truggered');
		viewPostsForLoggedInUser();
		viewUserJourneysNotInPost();
	}, [trigger, user]);


	// useEffect(() => {    
	// 	console.log('Truggered');
	// 	viewPostsForLoggedInUser();
	// 	viewUserJourneysNotInPost();
	// }, []);

	const viewPostsForLoggedInUser = async()=>{
		if(!isAuthenticated) return;
		const res = await viewPostsForUser(user!.nickname!);
		if(!res.data) return;
		if(res.data.collection){
			setPostsForUser(res.data.collection.reverse());
		}else{
			setPostsForUser(res.data);
		}
	};

	const viewUserJourneysNotInPost = async()=>{
		if(!isAuthenticated) return;
		console.log('Passed');
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'openid profile email read:current_user update:current_user_metadata',
			}}).catch(()=>{
			loginWithRedirect();
		});
	
		if(!token) return;

		const res = await viewJourneysForUser(user!.nickname!, token);
		if(!res.data) return;
		if(res.data.collection){
			const filtered = res.data.collection.filter((x: Journey)=> !postsForUser.map((p)=>p.journeyId).includes(x.id)); 
			setJourneysForUser(filtered.reverse());	
		}else{
			const filtered = res.data.filter((x: Journey)=> !postsForUser.map((p)=>p.journeyId).includes(x.id)); 
			setJourneysForUser(filtered.reverse());	

		}
	};

	const createPostForUser = async() => {
		if(!isAuthenticated) return;
		const post:Post = {
			username: user!.nickname!,
			text: postText,
			journeyId: +selectedJourneyId,
		};
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'openid profile email read:current_user update:current_user_metadata',
			}}).catch(()=>{
			loginWithRedirect();
		});
	
		if(!token) return;

		await createPost(post, token).catch((e)=>{
			if(e.response.status === 401){
				loginWithRedirect();
			}
		}).then(()=>{
			setTrigger(!trigger);
		}); 
	};
    
	return (
		<>
			<Navigation/>
			{isAuthenticated && (
				<>
					<Box sx={{mt: 10, border: 1, borderColor: 'black', px:4, py:4}}  >
						{journeysForUser.length > 0 && <h1>JourneysPresent</h1>}
						<TextField label="post-text" variant="outlined" required
  	                    onChange={(e)=>setPostText(e.target.value)} />
						 <Box sx={{ minWidth: 120 }}>
							<FormControl area-label="pick-journey" fullWidth>
								<InputLabel>Journey</InputLabel>
								<Select
									placeholder='select an optional journey'
									value={selectedJourneyId}
									label="pick-journey"
									onChange={handleChangeJourney}
								>
									{journeysForUser.map((journey)=>{
										return(
											<MenuItem key={journey.id} value={journey.id}>{journey.date.toString()}- {journey.type.toLowerCase().toString()}</MenuItem>
										);
									})}
									
								</Select>
							</FormControl>
						</Box>
  	                <Button variant="contained" onClick={()=>createPostForUser()}>Create post</Button>
  	            </Box> 
				My Posts 
					{postsForUser.length > 0 ?
						<UserPostsView posts={postsForUser} trigger={trigger} setTrigger={setTrigger}/>
						: <h1>No posts present</h1>}

				</>
			)}
			<Footer/>
		</>
	);
};
export default MyPosts;