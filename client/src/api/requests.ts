import axios from 'axios';
import { Post } from './types';

// This will be modied by using react query 

export const createUser = (username:string) => {
	return axios.post('http://localhost:8080/create-user', username).then((res) => {
		return res;
	});
};

export const createPost = (post: Post) => {
	return axios.post('http://localhost:8080/create-post',post ).then((res) => {
		return res;
	});
};

export const viewUsers = () => {
	return axios.get('http://localhost:8080/get-users').then((res)=>{
		return res;
	});
};

export const viewPostsForUser = (userId: number) => {
	return axios.get(`http://localhost:8080/view/posts/${userId}`).then((res) => {
		return res;
	});
};

export const deleteUserProfile = (userId:number)=>{
	return axios.delete(`http://localhost:8080/delete-profile/${userId}`).then((res) => {
		return res;
	});
};

export const deletePost = (postId:number)=>{
	return axios.delete(`http://localhost:8080/delete-post/${postId}`).then((res) => {
		return res;
	});
};




