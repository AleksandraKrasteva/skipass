import axios from 'axios';
import { Post } from './types';

export const createPost = (post: Post, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.post('http://skipass.api/create-post',post, {headers}).then((res) => {
		return res;
	});
};

export const viewPostsForUser = (username: string) => {
	return axios.get(`http://skipass.api/view-posts-user/${username}`).then((res) => {
		return res;
	});
};

export const viewAllPosts = () => {
	return axios.get('http://skipass.api/view-posts').then((res) => {
		return res;
	});
};

export type DeletePostDTO ={
	postId: number;
	deleteJourney: boolean;
}

export const deletePost = (data:DeletePostDTO, token: string)=>{
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete('http://skipass.api/delete-post', { data, headers}).then((res) => {
		return res;
	});
};

export type DeletePostsDTO ={
	username: string;
	deleteJourney: boolean;
}

export const deletePostsForUser = (data:DeletePostsDTO, token: string)=>{
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete('http://skipass.api/delete-all-posts', { data, headers} ).then((res) => {
		return res;
	});
};

export type UpdatePostDTO={
	postId: number;
	text:string;
}
export const updatePost = (request: UpdatePostDTO, token: string)=>{
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.put('http://skipass.api/update-post',request, {headers}).then((res) => {
		return res;
	});
};

export type ReactionDTO ={
	postId: number;
	creator: string
}
export const createReaction = (request: ReactionDTO, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.post('http://skipass.api/create-reaction',request, {headers}).then((res) => {
		return res;
	});
};

export const deleteReaction = (id:number, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete(`http://skipass.api/delete-reaction/${id}`, {headers}).then((res) => {
		return res;
	});
};

export const deleteReactions = (username:string, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete(`http://skipass.api/delete-reactions/${username}`, {headers}).then((res) => {
		return res;
	});
};

export const getReactionsForUser = (username:string, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.get(`http://skipass.api/get-reactions/${username}`, {headers}).then((res) => {
		return res;
	});
};


export const createJourney = (authorUsername:string, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};
	console.log(authorUsername);

	return axios.post('http://skipass.api/create-journey', authorUsername.toString(), {headers}).then((res) => {
		return res;
	});
};

export const viewJourney = (id:number) => {
	return axios.get(`http://skipass.api/view-journey/${id}`).then((res) => {
		return res;
	});
};

export const viewJourneysForUser = (username:string, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.get(`http://skipass.api/view-journeys-user/${username}`, {headers}).then((res) => {
		return res;
	});
};

export const deleteJourney = (id:number, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete(`http://skipass.api/delete-journey/${id}`, {headers}).then((res) => {
		return res;
	});
};

export const deleteJourneysForUser = (username:string, token: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};

	return axios.delete(`http://skipass.api/delete-journeys-user/${username}`, {headers}).then((res) => {
		return res;
	});
};