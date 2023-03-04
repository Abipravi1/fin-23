import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../axios/axios';

export default function LoginComponent() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [URL, setURL] = useState('');

	const login = () => {
		AxiosInstance.post('/login/', { username, password }).then(
			(res) => {
				console.log(res);
				localStorage.setItem('login', JSON.stringify(res.data));
				window.location.reload();
			},
			(err) => alert(err),
		);
	};

	const hostsave = async () => {
		await localStorage.setItem('url', URL);
		window.location.reload();
	};
	return (
		<div className='d-flex flex-column align-items-center w-100 h-100 justify-content-center p-4 mt-4'>
			<div className='d-flex flex-column gap-3 align-items-center p-4 border rounded border-secondary shadow-sm '>
				<p className='h6 text-dark'>Login</p>
				<input
					type='text'
					placeholder='UserName'
					onChange={(e) => setUsername(e.target.value)}
					className='form-control'
				/>
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					className='form-control'
				/>
				<button onClick={login} className='btn btn-primary'>
					Login
				</button>
			</div>
			<div className=' mt-3 d-flex flex-column gap-3 align-items-center p-4 border rounded border-secondary shadow-sm '>
				<p className='h6 text-dark'>HOST URL</p>
				<input
					type='text'
					placeholder='URL'
					onChange={(e) => setURL(e.target.value)}
					className='form-control'
				/>
				<button onClick={hostsave} className='btn btn-primary'>
					Save HOST
				</button>
			</div>
		</div>
	);
}
