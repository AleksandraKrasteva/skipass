/* eslint-disable @typescript-eslint/ban-ts-comment */
import { viewAllPosts } from '@/api/requests';
import { Post } from '@/api/types';
import Footer from '@/components/atoms/Footer';
import PostsView from '@/components/atoms/PostsView';
import Navigation from '@/components/molecultes/Navigation';
import useConditionalAuth from '@/config/conditionalAuth';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import React, {  useEffect, useState } from 'react';


const HomePage = () => {
	const { user, isAuthenticated } = useConditionalAuth();
	const [posts, setPosts] = useState<Post[]>([]); 
	const [trigger, setTrigger] = useState<boolean>(false);

	useEffect(()=>{
		getAllPosts();
	},[trigger]);
	
	const getAllPosts=async()=>{
		const res = await viewAllPosts();
		if(!res)return;

		let data; 
		if(res.data.collection){
			data = res.data.collection;
		}else{
			data = res.data;
		}
		
		if(isAuthenticated){
			const filtered = data.filter((x: Post)=>x.username != user!.nickname); 
			setPosts(filtered.reverse());

		}else{
			setPosts(data.reverse());
		}
	};	

	return (
		<>
			<Navigation/>
			{isAuthenticated && <Box sx={{mt:10}}>
				<Typography
					sx={{
						ml: 4,
						fontFamily: 'monospace',
						fontSize: 24,
						fontWeight: 800,
						letterSpacing: '.1rem',
						color: 'teal',
					}}
				> Welcome {user!.nickname}! 
				</Typography>
			</Box>}	
			{posts.length == 0 ?
				<Typography
					sx={{
						ml: 4,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'black',
					}}
				> Currently there are no posts from users, come back later :) 
				</Typography>
				:<PostsView posts={posts} trigger={trigger} setTrigger={setTrigger}/>	}
			<Footer/>
		</>
	);
};

export default HomePage;
