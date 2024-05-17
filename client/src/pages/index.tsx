import { UserData, createPost, createUser, deletePost, deleteUserProfile, viewPostsForUser, viewUsers } from '@/api/requests';
import { Post, User } from '@/api/types';
import Navigation from '@/components/molecultes/Navigation';
import { Box, Button, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';


const HomePage = () => {

	const [username, setUsername] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User['id']|null>(null);
	const [postText, setPostText] = useState<string>(''); 
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);

	const createUserProfile = async() =>{
		const user:UserData = {
			username: username,
			email: username+'@email.com'
		};
		await createUser(user);
	};

	const getUsers = async()=>{
		const res = await viewUsers();
		setUsers(res.data.collection);
	};

	const handleUserChange = (id:unknown) =>{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setSelectedUser(id);
	};

	const createPostForUser = async() => {
		if(!postText || !selectedUser) return;

		const post:Post = {
			userId: selectedUser,
			text: postText,
		};
		await createPost(post); 
	};

	const viewPosts = async()=>{
		if(!selectedUser) return;
		const res = await viewPostsForUser(selectedUser);
		setPostsForUser(res.data.collection);
	};

	const deleteUser = async()=>{
		if(!selectedUser) return;
		await deleteUserProfile(selectedUser);
		setSelectedUser(null);
	};
	
	const deletePostById = async(id:number)=>{
		await deletePost(id);
	};

	const handleLogin=()=>{
		const res = axios.get('http://localhost:3000/api/auth/login');
		console.log(res);
	};

	return (
		<>
			<Navigation/>
			<Box sx={{mt: 10, border: 1, borderColor: 'black'}} >
				<TextField  label="Username" variant="outlined" required
					onChange={(e)=>setUsername(e.target.value)} />
				<Button variant="contained" onClick={()=>createUserProfile()}>Create user</Button>
			</Box>
			<Box sx={{mt: 4, border: 1, borderColor: 'black'}} >
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
			</Box>
			<Button sx={{backgroundColor:'pink', mt:4}} variant="contained" onClick={()=>deleteUser()}>Delete selected user profile</Button>

			<Box sx={{mt: 4, border: 1, borderColor: 'black'}}  >
				<TextField id="outlined-basic" label="Post" variant="outlined" required
					onChange={(e)=>setPostText(e.target.value)} />
				<Button variant="contained" onClick={()=>createPostForUser()}>Create post for selected user</Button>
			</Box>

			<Box sx={{mt: 4, border: 1, borderColor: 'black'}}  >
				<Button variant="contained" onClick={()=>viewPosts()}>Get Posts For Selected User</Button>
				<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
					{postsForUser.map((post)=>{
						return (
							<ListItem alignItems="flex-start">
								<ListItemText
									primary={post.userId}
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
				<Button onClick={()=>handleLogin()}>Login</Button>
				<a href="/api/auth/login">Login</a>
			</Box>
		</>
	);
};

export default HomePage;
