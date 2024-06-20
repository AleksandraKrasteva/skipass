/* eslint-disable no-mixed-spaces-and-tabs */
import { createPost, viewJourneysForUser, viewPostsForUser } from '@/api/requests';
import { Journey, Post } from '@/api/types';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserPostsView from '@/components/atoms/UserPostsView';
import Navigation from '@/components/molecultes/Navigation';
import Footer from '@/components/atoms/Footer';

const MyPosts = () => {

	const [postText, setPostText] = useState<string>(''); 
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);
	const [journeysForUser, setJourneysForUser] = useState<Journey[]>([]);

	const [trigger, setTrigger] = useState<boolean>(false);

	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();

	const [selectedJourneyId, setSelectedJourneyId] = useState<string>('');

	const handleChangeJourney = (event: SelectChangeEvent) => {
		setSelectedJourneyId(event.target.value);
	};

	useEffect(() => {    
		viewPostsForLoggedInUser();
		viewUserJourneysNotInPost();
	}, [trigger]);

	const viewPostsForLoggedInUser = async()=>{
		if(!isAuthenticated) return;
		const res = await viewPostsForUser(user!.nickname!);
		setPostsForUser(res.data.reverse());
	};

	const viewUserJourneysNotInPost = async()=>{
		if(!isAuthenticated) return;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'openid profile email read:current_user update:current_user_metadata',
			}}).catch(()=>{
			loginWithRedirect();
		});
	
		if(!token) return;

		const res = await viewJourneysForUser(user!.nickname!, token);
		const filtered = res.data.filter((x: Journey)=> !postsForUser.map((p)=>p.journeyId).includes(x.id)); 
		setJourneysForUser(filtered.reverse());	
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
						<TextField id="outlined-basic" label="Post" variant="outlined" required
  	                    onChange={(e)=>setPostText(e.target.value)} />
						 <Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Journey</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectedJourneyId}
									label="Age"
									onChange={handleChangeJourney}
								>
									{journeysForUser.map((journey)=>{
										return(
											<MenuItem value={journey.id}>{journey.date.toString()}- {journey.type.toLowerCase().toString()}</MenuItem>
										);
									})}
									
								</Select>
							</FormControl>
						</Box>
  	                <Button variant="contained" onClick={()=>createPostForUser()}>Create post</Button>
  	            </Box> 
				My Posts 
					{postsForUser &&
					<UserPostsView posts={postsForUser} trigger={trigger} setTrigger={setTrigger}/>
					}
				</>
			)}
			<Footer/>
		</>
	);
};
export default MyPosts;