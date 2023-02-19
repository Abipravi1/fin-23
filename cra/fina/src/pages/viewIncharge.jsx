import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import CollectIncharge from './collectIncharge';

export default function ViewIncharge() {
	const [data, setData] = useState([]);
	const [showpage, setshowpage] = useState(false);
	const [selectedrow, setselectedrow] = useState(null);
	const [newData, setnewData] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [selectedUserData, setSelectedUserData] = useState({});

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
			<div>
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
									<td>{details.name}</td>
									<td>{details.place}</td>
									<td>{details.contact}</td>
									<td>{details.total_paid}</td>
									<td className='d-flex gap-3'>
										<button
											onClick={(e) => {
												delete1(details.id);
											}}
											className='btn btn-danger'>
											X
										</button>
										<button
											className='btn btn-outline-dark'
											onClick={() => {
												setshowpage(true);
												setSelectedUserData(details);
											}}>
											Collect
										</button>
									</td>
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
