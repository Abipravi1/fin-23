import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';

export default function ViewIncharge() {
	const [data, setData] = useState([]);

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
							<th>Amount</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 ? (
							data?.map((details) => (
								<tr>
									<td>{details.name}</td>
									<td>{details.place}</td>
									<td>{details.contact}</td>
									<td>{details.amount}</td>
									<td>
										<button
											onClick={(e) => delete1(details.id)}
											className='btn btn-danger'>
											X
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
			</div>
		</div>
	);
}
