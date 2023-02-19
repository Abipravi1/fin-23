import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import CollectionHistoryCompnent from './collectionHistory';

export default function CollectionModel({ customer_id, close, calla }) {
	const [data, setData] = useState({
		amount: 0,
		date: `${new Date().getFullYear()}-${
			new Date().getMonth() < 10
				? '0' + (new Date().getMonth() + 1).toString()
				: new Date().getMonth() + 1
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
			const data = await AxiosInstance.get(`/customer/${customer_id}/`);
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
			AxiosInstance.post('collection/save/weekly/', {
				customer_id,
				customer_name: customer.name,
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
			AxiosInstance.post(`/collection/update/weekly/${editId}/`, {
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
				<p className='h6 text-align-center'>{customer.name}</p>
				<p>Balance: {customer.balance}</p>
				<p>
					Start Date:{' '}
					{new Date(customer.date).getDate().toString() +
						'-' +
						new Date(customer.date).getMonth().toString() +
						'-' +
						new Date(customer.date).getFullYear().toString()}
				</p>
				<p>
					End Date:{' '}
					{new Date(customer.end_date).getDate().toString() +
						'-' +
						new Date(customer.end_date).getMonth().toString() +
						'-' +
						new Date(customer.end_date).getFullYear().toString()}
				</p>
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
			<CollectionHistoryCompnent
				customer_id={customer_id}
				edit={true}
				setEditId={setEditId}
			/>
		</div>
	);
}
