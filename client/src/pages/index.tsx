/* eslint-disable @typescript-eslint/ban-ts-comment */
import { viewAllPosts } from '@/api/requests';
import { Post } from '@/api/types';
import Footer from '@/components/atoms/Footer';
import PostsView from '@/components/atoms/PostsView';
import Navigation from '@/components/molecultes/Navigation';
import { useAuth0 } from '@auth0/auth0-react';
import React, {  useEffect, useState } from 'react';

const HomePage = () => {
	const { user, isAuthenticated } = useAuth0();
	const [posts, setPosts] = useState<Post[]>([]); 
	const [trigger, setTrigger] = useState<boolean>(false);

	
	const getAllPosts=async()=>{
		const res = await viewAllPosts();
		if(isAuthenticated){
			const filtered = res.data.filter((x: Post)=>x.username != user!.nickname); 
			setPosts(filtered.reverse());

		}else{
			setPosts(res.data.reverse());
		}
	};

	useEffect(()=>{
		getAllPosts();
	},[trigger]);

	return (
		<>
			<Navigation/>
			<PostsView posts={posts} trigger={trigger} setTrigger={setTrigger}/>
			<Footer/>

			{/* <Profile/> */}

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

			{/* <Box sx={{mt: 10, border: 1, borderColor: 'black'}}  >
				<TextField id="outlined-basic" label="Post" variant="outlined" required
					onChange={(e)=>setPostText(e.target.value)} />
				<Button variant="contained" onClick={()=>createPostForUser()}>Create post for selected user</Button>
			</Box> */}
			{/* 
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
				</List> */}
				
			{/* </Box> */}
		</>
	);
};

export default HomePage;
