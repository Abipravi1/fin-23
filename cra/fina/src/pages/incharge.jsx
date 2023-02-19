import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast';

export default function Incharge() {
	const [customerData, setCustomerData] = useState({
		name: '',
		place: '',
		address: '',
		contact: '',
		email: '',
		amount: 0,
		date: '',
	});

	const saveData = async () => {
		AxiosInstance.post('/incharge1/', customerData).then(
			(res) => {
				toast.success('incharge Data Added');
				window.location.href = '/Viewincharge';
			},
			(err) => toast.error('Invalid Incharge Data'),
		);
	};

	return (
		<div className='d-flex flex-column gap-4 w-100 align-items-center p-3'>
			<div className='d-flex flex-column gap-4 align-items-center p-3 w-25'>
				<TextField
					id='outlined-basic'
					label='Incharge Name'
					size='small'
					className='form-control'
					onChange={(e) =>
						setCustomerData({ ...customerData, name: e.target.value })
					}
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					className='form-control'
					label='Place'
					size='small'
					variant='outlined'
					onChange={(e) =>
						setCustomerData({ ...customerData, place: e.target.value })
					}
				/>
				<TextField
					id='outlined-basic'
					className='form-control'
					label='Address'
					onChange={(e) =>
						setCustomerData({ ...customerData, address: e.target.value })
					}
					size='small'
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					className='form-control'
					label='Contact'
					onChange={(e) =>
						setCustomerData({ ...customerData, contact: e.target.value })
					}
					size='small'
					variant='outlined'
				/>
				{/* <TextField
					id='outlined-basic'
					label='Amount'
					className='form-control'
					type='number'
					onChange={(e) =>
						setCustomerData({
							...customerData,
							amount: e.target.value,
						})
					}
					size='small'
					variant='outlined'
				/> */}
				<TextField
					id='outlined-basic'
					type='date'
					className='form-control'
					size='small'
					onChange={(e) =>
						setCustomerData({ ...customerData, date: e.target.value })
					}
					variant='outlined'
				/>
				<button onClick={saveData} className='btn btn-primary'>
					Save
				</button>
			</div>
		</div>
	);
}
