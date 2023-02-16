import axios from 'axios';

const AxiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
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
