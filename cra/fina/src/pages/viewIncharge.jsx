import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import CollectIncharge from './collectIncharge';
import EditIncharge from './incharge/editIncharge';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormGroup, FormControlLabel } from '@mui/material';

export default function ViewIncharge() {
	const [data, setData] = useState([]);
	const [showpage, setshowpage] = useState(false);
	const [selectedrow, setselectedrow] = useState(null);
	const [selectedUserData, setSelectedUserData] = useState({});
	const [edit, setEdit] = useState(false);
	const [cid, setCId] = useState(null);
	const [filterActive, setFilterActive] = useState(true);

	const callFunc = () => {
		AxiosInstance.get('/incharge1/').then((res) => setData(res.data));
	};

	useEffect(() => {
		callFunc();
	}, []);

	const delete1 = (id) => {
		if (window.confirm('Are you sure want to Delete?')) {
			AxiosInstance.delete(`/incharge/${id}/`).then((res) => {
				toast.success('Incharge Deleted');
				callFunc();
			});
		}
	};

	return (
		<div className='d-flex flex-column mt-3 p-3 gap-3 w-100'>
			{edit ? (
				<div
					style={{
						position: 'absolute',
						top: '20%',
						right: '50%',
						backgroundColor: 'whitesmoke',
						boxShadow: '1px -5px 20px 11px #a9a9a93b',
						padding: 10,
						borderRadius: 20,
					}}>
					<EditIncharge customer_id={cid} setedit={setEdit} />
				</div>
			) : null}
			<div className='d-flex flex-row w-50 mt-4'>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								defaultValue={!filterActive}
								onChange={(e) => setFilterActive((re) => !re)}
							/>
						}
						label='Show Inactive Credit Vouchers'
					/>
				</FormGroup>
				<a href='/incharge' className='btn btn-primary'>
					Add Incharge
				</a>
			</div>
			<div>
				<table className='table table-bordered table-stripped table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Place</th>
							<th>Contact</th>
							<th>Amount Paid</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 ? (
							data?.map((details) => (
								<tr onClick={() => {}}>
									{filterActive ? (
										details.active ? (
											<>
												{' '}
												<td
													onClick={() => {
														setEdit(true);
														setCId(details.id);
													}}>
													{' '}
													{details.name}
												</td>
												<td>{details.place}</td>
												<td>{details.contact}</td>
												<td>{details.total_paid}</td>
												<td className='d-flex gap-3'>
													<button
														className='btn btn-outline-dark'
														onClick={() => {
															setshowpage(true);
															setSelectedUserData(details);
														}}>
														Collect
													</button>
												</td>
											</>
										) : null
									) : (
										!details.active && (
											<>
												<td
													onClick={() => {
														setEdit(true);
														setCId(details.id);
													}}>
													{' '}
													{details.name}
												</td>
												<td>{details.place}</td>
												<td>{details.contact}</td>
												<td>{details.total_paid}</td>
												<td className='d-flex gap-3'>
													<button
														className='btn btn-outline-dark'
														onClick={() => {
															setshowpage(true);
															setSelectedUserData(details);
														}}>
														Collect
													</button>
												</td>
											</>
										)
									)}
								</tr>
							))
						) : (
							<tr>
								<td colSpan='2'>No Collection Data Found</td>
							</tr>
						)}
					</tbody>
				</table>

				{showpage ? (
					<CollectIncharge
						setshowpage={setshowpage}
						selectedUserData={selectedUserData}
						callFunc={callFunc}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
