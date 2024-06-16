/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createPost, deletePost, viewPostsForUser } from '@/api/requests';
import { Post } from '@/api/types';
import LoginButton from '@/components/atoms/LogInBtn';
import LogoutButton from '@/components/atoms/LogOutBtn';
import Profile from '@/components/atoms/UserProfile';
import Navigation from '@/components/molecultes/Navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
// import axios from 'axios';
import React, {  useState } from 'react';

const HomePage = () => {
	// const [username, setUsername] = useState('');
	// const [users, setUsers] = useState<User[]>([]);
	// const [selectedUser, setSelectedUser] = useState<User['id']|null>(null);
	const [postText, setPostText] = useState<string>(''); 
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);
	const [defaultPostsForUser, setDefaultPostsForUser] = useState<Post[]>([]);

	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect  } = useAuth0();

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


	// const createUserProfile = async() =>{
	// 	const user:UserData = {
	// 		username: username,
	// 		email: username+'@email.com'
	// 	};
	// 	await createUser(user);
	// };

	// const getUsers = async()=>{
	// 	const res = await viewUsers();
	// 	setUsers(res.data.collection);
	// };

	// const handleUserChange = (id:unknown) =>{
	// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 	// @ts-ignore
	// 	setSelectedUser(id);
	// };

	
	

	const createPostForUser = async() => {

		if(!isAuthenticated) return;
		const metadata = await getMetadata(); 
		console.log(metadata);
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

		console.log(token);
	
		if(!token) return;

		await createPost(post, token).catch((e)=>{
			if(e.response.status === 401){
				loginWithRedirect();
			}
		}); 
	};

	const viewPostsForLoggedIn = async()=>{
		if(!isAuthenticated) return;
		const metadata = await getMetadata(); 
		// @ts-ignore
		const res = await viewPostsForUser(metadata.email);
		setPostsForUser(res.data);
	};

	const viewPostsForDefaultUser =  async()=>{
		const res = await viewPostsForUser('default@email.com');
		setDefaultPostsForUser(res.data);
	};

	// getMetadata(); 

	// const deleteUser = async()=>{
	// 	if(!selectedUser) return;
	// 	await deleteUserProfile(selectedUser);
	// 	setSelectedUser(null);
	// };
	
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
		});
	};
	

	return (
		<>
			<Navigation/>
			{/* <Box sx={{mt: 10, border: 1, borderColor: 'black'}} >
				<TextField  label="Username" variant="outlined" required
					onChange={(e)=>setUsername(e.target.value)} />
				<Button variant="contained" onClick={()=>createUserProfile()}>Create user</Button>
			</Box> */}
			{/* <Box sx={{mt: 4, border: 1, borderColor: 'black'}} >
				<Button variant="contained" onClick={()=>getUsers()}>View all users</Button>
				<Select
					label='Users list'
					onChange={(e)=>handleUserChange(e.target.value)}
				>				
					{users.map((user)=>{
						return (
							<MenuItem value={user.id}>{user.username}</MenuItem>
						);})}			
				</Select>
			</Box> */}
			{/* <Button sx={{backgroundColor:'pink', mt:4}} variant="contained" onClick={()=>deleteUser()}>Delete selected user profile</Button> */}

			<Box sx={{mt: 10, border: 1, borderColor: 'black'}}  >
				<TextField id="outlined-basic" label="Post" variant="outlined" required
					onChange={(e)=>setPostText(e.target.value)} />
				<Button variant="contained" onClick={()=>createPostForUser()}>Create post for selected user</Button>
			</Box>

			<Box sx={{mt: 4, border: 1, borderColor: 'black'}}  >
				{isAuthenticated && (
					<>
						<Button variant="contained" onClick={()=>viewPostsForLoggedIn()}>Get mine posts</Button>
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
				
				<Button variant="contained" onClick={()=>viewPostsForDefaultUser()}>Get posts for Default user</Button>
				<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
					{defaultPostsForUser.map((post)=>{
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
				<LoginButton/>
				<LogoutButton/>
				<Profile/>
			</Box>
		</>
	);
};

export default HomePage;
