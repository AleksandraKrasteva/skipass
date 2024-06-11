import axios from 'axios';
import { Post } from './types';


// This will be modied by using react query 

export type UserData = {
	username: string;
	email:string;
}

// export const createUser = (user: UserData) => {

// 	return axios.post('http://4.182.131.77/:80/create-user', user).then((res) => {
// 		return res;
// 	});
// };

export const createPost = (post: Post, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.post('http://4.182.131.77/:80/create-post',post, {headers}).then((res) => {
		return res;
	});
};

// export const viewUsers = () => {
// 	return axios.get('http://4.182.131.77/:80/get-users').then((res)=>{
// 		return res;
// 	});
// };

export const viewPostsForUser = (userEmail: string) => {
	return axios.get(`http://4.182.131.77/:80/view/${userEmail}`).then((res) => {
		return res;
	});
};

// export const deleteUserProfile = (userId:number)=>{
// 	return axios.delete(`http://4.182.131.77/:80/delete-profile/${userId}`).then((res) => {
// 		return res;
// 	});
// };

export const deletePost = (postId:number, token: string)=>{
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete(`http://4.182.131.77/:80/delete-post/${postId}`, {headers}).then((res) => {
		return res;
	});
};






