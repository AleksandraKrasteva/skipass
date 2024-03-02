import axios from 'axios';

export const sendRequest = () => {
	return axios.get('http://localhost:8080').then((res) => {
		return res.data;
	});
};
