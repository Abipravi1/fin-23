import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast';

export default function AddMonthlyCustomer() {
	const navigate = useNavigate();
	const [customerData, setCustomerData] = useState({
		name: '',
		place: '',
		address: '',
		contact: '',
		email: '',
		amount: 0,
		balance: 0,
		start_date: `${new Date().getFullYear()}-${
			new Date().getMonth() < 10
				? '0' + (new Date().getMonth() + 1).toString()
				: new Date().getMonth() + 1
		}-${
			new Date().getDate() < 10
				? '0' + new Date().getDate().toString()
				: new Date().getDate()
		}`,
		end_date: '',
		intrest: '',
		total_amount: '',
		description: '',
	});

	function diffDays(date1, date2) {
		date1 = new Date(date1);
		date2 = new Date(date2);
		var Difference_In_Time = date2.getTime() - date1.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		return Difference_In_Days;
	}

	function differenceInMonths(date1, date2) {
		date1 = new Date(date1);
		date2 = new Date(date2);
		const monthDiff = date2.getMonth() - date1.getMonth();
		const yearDiff = date2.getYear() - date1.getYear();

		return monthDiff + yearDiff * 12;
	}

	function calculate() {
		let { start_date, end_date, intrest, amount } = customerData;
		const diff = differenceInMonths(start_date, end_date);
		let newInt = Math.floor(
			(parseInt(amount) / 100) * parseInt(intrest) * diff + parseInt(amount),
		);
		newInt = newInt.toString();
		setCustomerData({ ...customerData, total_amount: newInt });
	}

	const saveData = async () => {
		AxiosInstance.post('/getcustomermonthly/', customerData).then(
			(res) => {
				toast.success('Customer Data Added');
				navigate('/montlhy');
			},
			(err) => toast.error('Invalid Customer Data'),
		);
	};

	return (
		<div className='d-flex flex-column p-2  align-items-center'>
			<p className='h5'>Monthly Loan Add</p>
			<div className='d-flex flex-column shadow-xl border rounded gap-4 align-items-center p-3 w-25'>
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
				<TextField
					id='outlined-basic'
					label='Amount'
					className='form-control'
					type='number'
					onChange={(e) =>
						setCustomerData({
							...customerData,
							amount: e.target.value,
							balance: e.target.value,
						})
					}
					size='small'
					variant='outlined'
				/>
				<TextField
					id='outlined-basic'
					type='date'
					className='form-control'
					defaultValue={customerData?.start_date}
					size='small'
					onChange={(e) =>
						setCustomerData({ ...customerData, start_date: e.target.value })
					}
					variant='outlined'
				/>

				<TextField
					id='outlined-basic'
					type='text'
					className='form-control'
					label='Inrest Percent'
					size='small'
					onChange={(e) =>
						setCustomerData({ ...customerData, intrest: e.target.value })
					}
					variant='outlined'
				/>
				<div className='d-flex gap-1'>
					<TextField
						id='outlined-basic'
						type='text'
						className='form-control'
						label={customerData?.total_amount}
						defaultValue={customerData?.total_amount}
						size='small'
						onChange={(e) =>
							setCustomerData({ ...customerData, total_amount: e.target.value })
						}
						variant='outlined'
					/>
					<button className='btn btn-outline-secondary' onClick={calculate}>
						+
					</button>
				</div>
				<button onClick={saveData} className='btn btn-primary'>
					Save
				</button>
			</div>
		</div>
	);
}
