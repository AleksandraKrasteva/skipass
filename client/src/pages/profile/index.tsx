/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createPost, deletePost, viewPostsForUser } from '@/api/requests';
import { Post } from '@/api/types';
import Navigation from '@/components/molecultes/Navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Profile = () => {

	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect  } = useAuth0();
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);
	const [postText, setPostText] = useState<string>(''); 
	const [trigger, setTrigger] = useState<boolean>(false); 

	useEffect(() => {        
		viewPostsForLoggedInUser();
	}, [trigger]);
    
	const getMetadata = async()=>{
		if (!isAuthenticated) {
			return;
		}
		const userDetailsByIdUrl: string = `https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/users/${user?.sub}`;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}});

		const metadata =  await fetch(userDetailsByIdUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	
		return await metadata.json();
	};
    
	const createPostForUser = async() => {
		if(!isAuthenticated) return;
		const metadata = await getMetadata(); 
		const post:Post = {
			// @ts-ignore
			userEmail: metadata.email,
			text: postText,
		};
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
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


	const deletePostById = async(id:number)=>{
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			loginWithRedirect();
		});

		if(!token) return;


		await deletePost(id, token).catch((e)=>{
			console.log(e);
			if(e.response.status === 401){
				loginWithRedirect();
			}
		}).then(()=>{
			setTrigger(!trigger);
		}); 
	};

	const viewPostsForLoggedInUser = async()=>{
		if(!isAuthenticated) return;
		const metadata = await getMetadata();
		// @ts-ignore
		const res = await viewPostsForUser(metadata.email);
		setPostsForUser(res.data);
	};
    
	return (
		<>
			<Navigation/>

			{isAuthenticated && (
				<>
					<Box sx={{mt: 10, border: 1, borderColor: 'black'}}  >
						<TextField id="outlined-basic" label="Post" variant="outlined" required
							onChange={(e)=>setPostText(e.target.value)} />
						<Button variant="contained" onClick={()=>createPostForUser()}>Create post</Button>
					</Box>

					<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        My posts
						{postsForUser.map((post)=>{ 
							return (
								<ListItem alignItems="flex-start">
									<ListItemText
										primary={post.userEmail}
										secondary={
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												{post.text}
											</Typography>
										}
									/>
									<Button  sx={{backgroundColor:'pink'}} size="small" variant="contained" onClick={()=>deletePostById(post.id!)}>Delete</Button>
								</ListItem>
							);
						})}
					</List>
				</>
			)}
		</>
	);
};

export default Profile;
