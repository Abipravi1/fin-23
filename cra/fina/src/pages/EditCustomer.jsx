import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

const EditCustomer = ({ setedit, customer_id }) => {
	const [data, setData] = useState({});

	const Get = () => {
		AxiosInstance.get(`customer/${customer_id}/`).then((res) => {
			setData(res.data);
		});
	};

	const Save = () => {
		AxiosInstance.put(`customer/${customer_id}/`, data).then(
			(res) => {
				toast.success('Saved Successfullly');
				window.location.reload();
			},
			(err) => toast.error('Failed to save data'),
		);
	};

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
					<Box
						component='form'
						sx={{
							'& > :not(style)': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete='off'>
						<div>
							<p>Name</p>
							<input
								id='outlined-basic'
								label='Customer Name'
								className='form-control'
								size='small'
								defaultValue={data.name}
								variant='outlined'
								onChange={(e) => setData({ ...data, name: e.target.value })}
							/>
						</div>
						<p>Place</p>
						<input
							id='outlined-basic'
							label='Place'
							className='form-control'
							size='small'
							defaultValue={data.place}
							variant='outlined'
							onChange={(e) => setData({ ...data, place: e.target.value })}
						/>
						<p>Loan Amount</p>
						<input
							id='outlined-basic'
							label='Amount'
							className='form-control'
							size='small'
							defaultValue={data.amount}
							variant='outlined'
							type='number'
							onChange={(e) => setData({ ...data, amount: e.target.value })}
						/>
						<p>Balance</p>
						<input
							id='outlined-basic'
							label='Amount'
							className='form-control'
							size='small'
							defaultValue={data.balance}
							variant='outlined'
							type='number'
							onChange={(e) => setData({ ...data, balance: e.target.value })}
						/>
						<p>Contact</p>
						<input
							id='outlined-basic'
							label='contact'
							className='form-control'
							size='small'
							defaultValue={data.contact}
							variant='outlined'
							type='number'
							onChange={(e) => setData({ ...data, contact: e.target.value })}
						/>
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

export default EditCustomer;
