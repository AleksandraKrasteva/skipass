import { Post, createPost, createUser, deletePost, deleteUserProfile, viewPostsForUser, viewUsers } from '@/api/userProfile';
import Navigation from '@/components/molecultes/Navigation';
import { Box, Button, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
export type User = {
	id: number;
	username:string;
	email:string;
	type:string;
}

const index = () => {

	const [username, setUsername] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User['id']|null>(null);
	const [postText, setPostText] = useState<string>(''); 
	const [postsForUser, setPostsForUser] = useState<Post[]>([]);



	const createUserProfile = async() =>{
		const res = await createUser(username);
		console.log(res);
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
		const res = await createPost(post); 
		console.log(res);
	};

	const viewPosts = async()=>{
		if(!selectedUser) return;
		const res = await viewPostsForUser(selectedUser);
		console.log(res);
		setPostsForUser(res.data.collection);
	};

	const deleteUser = async()=>{
		if(!selectedUser) return;
		const res = await deleteUserProfile(selectedUser);
		setSelectedUser(null);
		console.log(res);
	};
	
	const deletePostById = async(id:number)=>{
		const res = await deletePost(id);
		console.log(res);		
	};

	return (
		<>
			<Navigation/>
			<Box sx={{mt: 40}} >
				<TextField id="outlined-basic" label="Username" variant="outlined" required
					onChange={(e)=>setUsername(e.target.value)} />
				<Button onClick={()=>createUserProfile()}>Create user</Button>
			</Box>
			<Button onClick={()=>getUsers()}>View all users</Button>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				onChange={(e)=>handleUserChange(e.target.value)}
			>				
				{users.map((user)=>{
					return (
						<MenuItem value={user.id}>{user.username}</MenuItem>
					);})}			
			</Select>
			<Box sx={{mt: 4}} >
				<TextField id="outlined-basic" label="Post" variant="outlined" required
					onChange={(e)=>setPostText(e.target.value)} />
				<Button onClick={()=>createPostForUser()}>Create post for selected user</Button>
			</Box>

			<Button onClick={()=>deleteUser()}>DELETE SELECTED USER PROFILE</Button>
			<Button onClick={()=>viewPosts()}>Get Posts For Selected User</Button>
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
							<Button onClick={()=>deletePostById(post.id!)}>Delete</Button>
						</ListItem>
					);
				})}
			</List>


		</>
	);
};

export default index;
