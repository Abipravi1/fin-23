import axios from 'axios';

const URL = localStorage.getItem('url');

const AxiosInstance = axios.create({
	baseURL: `${URL}/api`,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'authorization': JSON.parse(localStorage.getItem('login'))
			? JSON.parse(localStorage.getItem('login')).token
			: '',
	},
});

const Func = () => {
	AxiosInstance.get(`getcustomer/12weeks`).then(
		(res) => {},
		(err) => {
			if (err.response.status === 401) {
				localStorage.clear();
				window.location.reload();
			}
		},
	);
};

export { AxiosInstance };
