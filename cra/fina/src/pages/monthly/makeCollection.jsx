import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../axios/axios';
import toast from 'react-hot-toast';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function MakeCollection({ customer_id, close, calla }) {
	const [data, setData] = useState({
		amount: 500,
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
	const [filterData, setFilterData] = useState('intrest');
	const [data1, setData1] = useState([]);

	useEffect(() => {
		const getData1 = async () => {
			const data = await AxiosInstance.get(`/customer/monthly/${customer_id}/`);
			setCustomer(data.data);
		};
		const getC = async () => {
			if (filterData === 'principle') {
				const data = await AxiosInstance.get(`/collection/${editId}/`);
				setHis(data.data);
			} else if (filterData === 'intrest') {
				const data = await AxiosInstance.get(`/intrestdatadetails/${editId}/`);
				setHis(data.data.data);
			}
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
			AxiosInstance.post(`collection/save/montlhy/${filterData}/`, {
				customer_id,
				customer_name: customer?.name,
				amount: data.amount,
				date: `${new Date().getFullYear()}-${
					new Date().getMonth() < 10
						? '0' + (new Date().getMonth() + 1).toString()
						: new Date().getMonth() + 1
				}-${
					new Date().getDate() < 10
						? '0' + new Date().getDate().toString()
						: new Date().getDate()
				}`,
			}).then(
				(res) => {
					toast.success('Collected');
					calla();
					close(false);
				},
				(err) => toast.error('Error Saving..'),
			);
		} else if (editId) {
			AxiosInstance.post(
				`/collection/update/montlhy/${editId}/${filterData}/`,
				{
					amount: data.amount,
				},
			).then(
				(res) => {
					toast.success('Edtited');
					calla();
					close(false);
				},
				(err) => toast.error('Error Saving..'),
			);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = (e) => {
		if (e === 'principle') {
			AxiosInstance.get(`/collection/get/monthly/monthly/${customer_id}/`).then(
				(res) => setData1(res.data.data),
			);
		} else {
			AxiosInstance.get(`/intrestdata/${customer_id}/`).then((res) =>
				setData1(res.data.data),
			);
		}
	};

	return (
		<div
			className='d-flex flex-row p-4 align-items-center justify-content-evenly w-100 flex-wrap'
			style={{ gap: 20 }}>
			<div className='d-flex flex-column gap-3 '>
				<p className='h6 text-align-center'>Amount Collection</p>
				<p
					className={
						filterData === 'principle' ? 'badge bg-danger' : 'badge bg-dark'
					}>
					Collection Mode: {filterData.toUpperCase()}
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
			<div className='d-flex flex-column gap-3'>
				<FormControl>
					<FormLabel id='demo-row-radio-buttons-group-label'>Filter</FormLabel>
					<RadioGroup
						row
						value={filterData}
						onChange={(e) => {
							setFilterData(e.target.value);
							getData(e.target.value);
						}}
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'>
						<FormControlLabel
							value='intrest'
							control={<Radio />}
							label='Intrest Data'
						/>
						<FormControlLabel
							value='principle'
							control={<Radio />}
							label='Amount'
						/>
					</RadioGroup>
				</FormControl>
				<div style={{ maxHeight: 200, overflow: 'auto', minHeight: 200 }}>
					{filterData === 'principle' ? (
						<div className='d-flex flex-column align-items-center justofy-content-center w-100'>
							<table className='table table-bordered table-stripped'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{data1?.length > 0 ? (
										data1?.map((details) => {
											return (
												<tr>
													<td>{details.date}</td>
													<td>{details.amount}</td>
													<td>
														<button
															className='btn btn-primary'
															onClick={async (_) => {
																await setEditId(details.id);
															}}>
															Edit
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan='3'>No Collection Data Found</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					) : (
						<div className='d-flex flex-column align-items-center justofy-content-center w-100'>
							<table className='table table-bordered table-stripped'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{data1?.length > 0 ? (
										data1?.map((details) => {
											return (
												<tr>
													<td>{details.date}</td>
													<td>{details.amount}</td>
													<td>
														<button
															className='btn btn-primary'
															onClick={async (_) => {
																await setEditId(details.id);
															}}>
															Edit
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan='3'>No Collection Data Found</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
