import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../axios/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import Switch from '@mui/material/Switch';
import { Button, FormGroup, FormControlLabel } from '@mui/material';

const EditLoans = ({ setedit, customer_id }) => {
	const [data, setData] = useState({});
	const [old, setold] = useState('');

	const Get = () => {
		AxiosInstance.get(`customer/monthly/${customer_id}/`).then((res) => {
			setData(res.data);
			setold(res.data.intrest);
		});
	};

	const Save = () => {
		AxiosInstance.put(`customer/monthly/${customer_id}/`, data).then(
			(res) => {
				toast.success('Saved Successfullly');
				window.location.reload();
			},
			(err) => toast.error('Failed to save data'),
		);
	};

	const saveActive = () => {
		AxiosInstance.post(`active/montlhyloan/`, {
			customer_id: customer_id,
			state: data.active ? 'deactive' : 'active',
		}).then((res) => {
			toast.success('Activated');
			window.location.reload();
		});
	};

	function diffDays(date1, date2) {
		date1 = new Date(date1);
		date2 = new Date(date2);
		var Difference_In_Time = date2.getTime() - date1.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		return Difference_In_Days;
	}

	function cold() {
		let { start_date, end_date, amount } = data;
		const diff = diffDays(start_date, end_date);
		let newInt =
			((0.08 * parseFloat(old) * parseInt(amount)) / 100) * diff +
			parseInt(amount);
		return newInt;
	}

	function calculate() {
		let { start_date, end_date, intrest, amount } = data;
		const diff = diffDays(start_date, end_date);
		let newInt =
			((0.08 * parseFloat(intrest) * parseInt(amount)) / 100) * diff +
			parseInt(amount);
		newInt = newInt.toString();
		const x = cold() - newInt;
		let newBal = 0;
		if (old < intrest) {
			newBal = parseInt(data.total_amount) + Math.abs(x);
		} else {
			newBal = parseInt(data.total_amount) - Math.abs(x);
		}
		setData({ ...data, total_amount: newBal });
	}

	useEffect(() => {
		Get();
	}, []);

	return (
		<div>
			<button
				className='btn btn-primary'
				onClick={() => setedit(false)}
				style={{ margin: '10px' }}
				variant='primary'>
				close
			</button>

			<div
				style={{
					display: 'inlineflex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '10px',
				}}>
				<div style={{ marginLeft: '80px' }}>
					<Box className='d-flex flex-column gap-2 p-4' autoComplete='off'>
						<TextField
							id='outlined-basic'
							className='form-control'
							size='small'
							value={data.name}
							variant='outlined'
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
						<TextField
							id='outlined-basic'
							className='form-control'
							size='small'
							value={data.place}
							variant='outlined'
							onChange={(e) => setData({ ...data, place: e.target.value })}
						/>
						<TextField
							id='outlined-basic'
							className='form-control'
							size='small'
							value={data.amount}
							variant='outlined'
							type='number'
							onChange={(e) => setData({ ...data, amount: e.target.value })}
						/>
						<TextField
							className='form-control'
							value={data.intrest}
							step='0.5'
							size='small'
							type='number'
							onChange={(e) => setData({ ...data, intrest: e.target.value })}
						/>
						<TextField
							id='outlined-basic'
							type='date'
							className='form-control'
							value={data.start_date}
							size='small'
							variant='outlined'
							onChange={(e) => setData({ ...data, start_date: e.target.value })}
						/>
						<TextField
							id='outlined-basic'
							type='date'
							className='form-control'
							value={data.end_date}
							size='small'
							variant='outlined'
							onChange={(e) => setData({ ...data, end_date: e.target.value })}
						/>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										onChange={saveActive}
										checked={data?.active}
										color='secondary'
									/>
								}
								label={'Status '}
							/>
						</FormGroup>
					</Box>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '20px',
					}}
					onClick={Save}>
					{' '}
					<Button variant='success'> Save </Button>{' '}
				</div>
			</div>
		</div>
	);
};

export default EditLoans;
