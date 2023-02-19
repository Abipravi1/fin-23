import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import { AxiosInstance } from '../axios/axios';

export default function CollectIncharge({
	setshowpage,
	selectedUserData,
	callFunc,
}) {
	const [newData, setNewData] = useState([]);
	const [newAmount, setNewAmount] = useState(0);
	const [date, setDate] = useState(
		`${new Date().getFullYear()}-${
			new Date().getMonth() < 10
				? '0' + (new Date().getMonth() + 1).toString()
				: new Date().getMonth() + 1
		}-${
			new Date().getDate() < 10
				? '0' + new Date().getDate().toString()
				: new Date().getDate()
		}`,
	);
	const [editId, setEditId] = useState(null);
	const [editdata, setEditData] = useState(null);

	useEffect(() => {
		AxiosInstance.get(`/inchargecollection/${selectedUserData.id}/`).then(
			(Res) => setNewData(Res.data.data),
		);
	}, []);

	useEffect(() => {
		if (editId) {
			AxiosInstance.get(`inchargeacc/${editId}/`).then((res) =>
				setEditData(res.data.data.amount),
			);
		}
	}, [editId]);

	const save = () => {
		if (!editId) {
			AxiosInstance.post(`/inchargecollection/`, {
				customer_id: selectedUserData.id,
				date: date,
				amount: newAmount,
			}).then(
				(res) => {
					toast.success('Amount Saved');
					setshowpage(false);
					callFunc();
				},
				(err) => {
					toast.error(err);
				},
			);
			setEditId(null);
		} else {
			AxiosInstance.post(`/inchargecollection/${editId}/`, {
				amount: newAmount,
			}).then(
				(res) => {
					toast.success('Amount Updated');
					setEditId(null);
					setshowpage(false);
					callFunc();
				},
				(err) => toast.error(err),
			);
		}
	};

	return (
		<div className=''>
			<div
				style={{
					height: '50%',
					width: '90%',
					position: 'absolute',
					top: '20%',
					left: '5%',
					zIndex: '2',
					flexWrap: 'wrap',
					padding: 20,
					backgroundColor: 'whitesmoke',
					borderRadius: 20,
					boxShadow: '1px -5px 20px 11px #a9a9a93b',
				}}>
				<button className='btn btn-danger' onClick={() => setshowpage(false)}>
					X
				</button>

				<div className='m-4'>
					<h6 className='m-3'>Customer Name: {selectedUserData?.name}</h6>
					<div className='d-flex gap-4 flex-wrap'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
								alignItems: 'center',
							}}>
							{!editId ? (
								<TextField
									id='outlined-basic'
									label='Amount'
									onChange={(e) => setNewAmount(e.target.value)}
									size='small'
									type='number'
									className='form-control'
									variant='outlined'
								/>
							) : (
								<input
									id='outlined-basic'
									label='Amount'
									onChange={(e) => setNewAmount(e.target.value)}
									size='small'
									defaultValue={editdata}
									type='number'
									className='form-control'
									variant='outlined'
								/>
							)}

							<button className='btn btn-primary w-50' onClick={save}>
								Save
							</button>
						</div>
						<div>
							<table className='table table-bordered table-stripped'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{newData.map((row, index) => (
										<tr key={index}>
											<td>{row.date}</td>
											<td>{row.amount}</td>
											<td>
												<button
													className='btn btn-outline-success'
													onClick={() => setEditId(row.id)}>
													🖋️
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
