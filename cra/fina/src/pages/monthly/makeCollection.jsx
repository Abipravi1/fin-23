import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../axios/axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import CollectionHistoryCompnentMonthly from './CoH';

export default function MakeCollection({ customer_id, close, calla }) {
	const [data, setData] = useState({
		amount: 500,
		date: `${new Date().getFullYear()}-${
			new Date().getMonth() < 10
				? '0' + new Date().getMonth().toString()
				: new Date().getMonth()
		}-${
			new Date().getDate() < 10
				? '0' + new Date().getDate().toString()
				: new Date().getDate()
		}`,
	});
	const [his, setHis] = useState({});
	const [customer, setCustomer] = useState({});
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const getData1 = async () => {
			const data = await AxiosInstance.get(`/customer/monthly/${customer_id}/`);
			setCustomer(data.data);
		};

		const getC = async () => {
			const data = await AxiosInstance.get(`/collection/${editId}/`);
			setHis(data.data);
		};
		if (customer_id) {
			getData1();
		}
		if (editId) {
			getC();
		}
	}, [editId]);

	const save = () => {
		if (!editId) {
			AxiosInstance.post('collection/save/montlhy/', {
				customer_id,
				customer_name: customer?.name,
				amount: data.amount,
				date: data.date,
			}).then(
				(res) => {
					toast.success('Collected');
					calla();
					close(false);
				},
				(err) => toast.error('Error Saving..'),
			);
		} else {
			AxiosInstance.post(`/collection/update/montlhy/${editId}/`, {
				amount: data.amount,
			}).then(
				(res) => {
					toast.success('Edtited');
					calla();
					close(false);
				},
				(err) => toast.error('Error Saving..'),
			);
		}
	};

	return (
		<div
			className='d-flex flex-row p-4 align-items-center justify-content-between w-100'
			style={{ gap: 20 }}>
			<div className='d-flex flex-column gap-3 w-50'>
				<p className='h6 text-align-center'>Amount Collection</p>
				<TextField
					id='outlined-basic'
					label='Date'
					size='small'
					type='date'
					defaultValue={data.date}
					className='form-control'
					onChange={(e) => setData({ ...data, amount: e.target.value })}
					variant='outlined'
				/>
				{!editId ? (
					<TextField
						id='outlined-basic'
						onChange={(e) => setData({ ...data, amount: e.target.value })}
						label='Amount'
						size='small'
						type='number'
						className='form-control'
						variant='outlined'
					/>
				) : (
					<input
						id='outlined-basic'
						onChange={(e) => setData({ ...data, amount: e.target.value })}
						defaultValue={his.amount}
						label='Amount1'
						size='small'
						type='number'
						className='form-control'
						variant='outlined'
					/>
				)}
				<button className='btn btn-success' onClick={save}>
					Save
				</button>
			</div>
			<CollectionHistoryCompnentMonthly
				customer_id={customer_id}
				edit={true}
				setEditId={setEditId}
			/>
		</div>
	);
}
