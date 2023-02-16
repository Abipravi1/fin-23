import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast';
import EditCustomer from './EditCustomer';

export default function AddCustomerWeekly() {
	const [customerData, setCustomerData] = useState({
		name: '',
		place: '',
		address: '',
		contact: '',
		email: '',
		amount: 0,
		balance: 0,
		description: '',
		date: '',
		end_date: '',
		periods: '',
	});

	function addWeeks() {
		let date = new Date(customerData?.date);
		const w =
			customerData?.periods === '12weeks'
				? 12
				: customerData?.periods === '15weeks'
				? 15
				: 0;
		date.setDate(date.getDate() + 7 * w);
		return date;
	}

	const saveData = async () => {
		const data = {
			name: customerData?.name,
			place: customerData?.place,
			address: customerData?.address,
			contact: customerData?.contact,
			email: customerData?.email,
			amount: customerData?.amount,
			balance: customerData?.balance,
			description: customerData?.description,
			date: customerData?.date,

			end_date: addWeeks(),
			periods: customerData?.periods,
		};
		AxiosInstance.post('/getcustomer/create/', data).then(
			(res) => {
				toast.success('Customer Data Added');
				window.location.href = '/customer';
			},
			(err) => toast.error('Invalid Customer Data'),
		);
	};

	return (
		<div className='d-flex flex-column p-2  align-items-center'>
			<div className='d-flex flex-column shadow-xl border rounded gap-4 align-items-center p-3 w-25'>
				<h3>Weekly loan</h3>
				<TextField
					id='outlined-basic'
					label='Customer Name'
					className='form-control'
					size='small'
					onChange={(e) =>
						setCustomerData({ ...customerData, name: e.target.value })
					}
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					label='Place'
					className='form-control'
					size='small'
					variant='outlined'
					onChange={(e) =>
						setCustomerData({ ...customerData, place: e.target.value })
					}
				/>
				<TextField
					id='outlined-basic'
					label='Address'
					onChange={(e) =>
						setCustomerData({ ...customerData, address: e.target.value })
					}
					className='form-control'
					size='small'
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					label='Contact'
					onChange={(e) =>
						setCustomerData({ ...customerData, contact: e.target.value })
					}
					className='form-control'
					size='small'
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					label='Amount'
					type='number'
					onChange={(e) =>
						setCustomerData({
							...customerData,
							amount: e.target.value,
							balance: e.target.value,
						})
					}
					className='form-control'
					size='small'
					variant='outlined'
				/>
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
				<FormControl fullWidth size='small' className='form-control'>
					<InputLabel id='demo-simple-select-label'>Loan Type</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						onChange={(e) => {
							setCustomerData({ ...customerData, periods: e.target.value });
							addWeeks();
						}}
						label='Loan Type'>
						<MenuItem value={'12weeks'}>12 Weeks</MenuItem>
						<MenuItem value={'15weeks'}>15 Weeks</MenuItem>
					</Select>
				</FormControl>
				<button onClick={saveData} className='btn btn-primary'>
					Save
				</button>
			</div>
		</div>
	);
}
