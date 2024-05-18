import axios from 'axios';
import { Post } from './types';

// This will be modied by using react query 

export type UserData = {
	username: string;
	email:string;
}

// export const createUser = (user: UserData) => {

// 	return axios.post('http://skipass.api:80/create-user', user).then((res) => {
// 		return res;
// 	});
// };

export const createPost = (post: Post) => {
	return axios.post('http://skipass.api:80/create-post',post ).then((res) => {
		return res;
	});
};

// export const viewUsers = () => {
// 	return axios.get('http://skipass.api:80/get-users').then((res)=>{
// 		return res;
// 	});
// };

export const viewPostsForUser = (userEmail: string) => {
	return axios.get(`http://skipass.api:80/view/posts/${userEmail}`).then((res) => {
		return res;
	});
};

export const deleteUserProfile = (userId:number)=>{
	return axios.delete(`http://skipass.api:80/delete-profile/${userId}`).then((res) => {
		return res;
	});
};

export const deletePost = (postId:number)=>{
	return axios.delete(`http://skipass.api:80/delete-post/${postId}`).then((res) => {
		return res;
	});
};




