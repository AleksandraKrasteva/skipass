/* eslint-disable @typescript-eslint/ban-ts-comment */
import { viewAllPosts } from '@/api/requests';
import { Post } from '@/api/types';
import Footer from '@/components/atoms/Footer';
import PostsView from '@/components/atoms/PostsView';
import Navigation from '@/components/molecultes/Navigation';
import useConditionalAuth from '@/config/conditionalAuth';

import Box from '@mui/material/Box';
import React, {  useEffect, useState } from 'react';


const HomePage = () => {
	const { user, isAuthenticated } = useConditionalAuth();

	// if(process.env.NEXT_PUBLIC_ENVIRONMENT == 'test'){
	// 	{ user, isAuthenticated } =  useTestAuth0(); 
	// }else{
	// 	{ user, isAuthenticated } =  useAuth0();
	// }

	const [posts, setPosts] = useState<Post[]>([]); 
	const [trigger, setTrigger] = useState<boolean>(false);

	console.log(isAuthenticated);
	
	const getAllPosts=async()=>{
		const res = await viewAllPosts();
		if(res.data )return;

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

	useEffect(()=>{
		getAllPosts();
	},[trigger]);

	return (
		<>
			<Navigation/>
			{isAuthenticated && <Box sx={{mt:10}}>
				<h1>Welcome</h1> {user!.nickname}
			</Box>}
			<PostsView posts={posts} trigger={trigger} setTrigger={setTrigger}/>
			<Footer/>
		</>
	);
};

export default HomePage;
