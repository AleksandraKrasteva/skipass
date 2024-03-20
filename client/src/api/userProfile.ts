import axios from 'axios';

export const createUser = (username:string) => {
	return axios.post('http://localhost:8080/createuser', username).then((res) => {
		return res;
	});
};

export const createPost = (post: Post) => {
	// const data = {
	// 	text : post.text,
	// 	userId : post.userId
	// };

	return axios.post('http://localhost:8080/createpost',post ).then((res) => {
		return res;
	});
};

export const viewUsers = () => {
	return axios.get('http://localhost:8080/getusers').then((res)=>{
		return res;
	});
};

export type Post ={
	userId: number;
	text: string;
	id?:number;
}



export const viewPostsForUser = (userId: number) => {
	return axios.get(`http://localhost:8080/view/posts/${userId}`).then((res) => {
		return res;
	});
};

export const deleteUserProfile = (userId:number)=>{
	return axios.delete(`http://localhost:8080/deleteprofile/${userId}`).then((res) => {
		return res;
	});
};

export const deletePost = (postId:number)=>{
	return axios.delete(`http://localhost:8080/deletepost/${postId}`).then((res) => {
		return res;
	});
};




