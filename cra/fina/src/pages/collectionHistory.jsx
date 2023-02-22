import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';

export default function CollectionHistoryCompnent({
	customer_id,
	edit,
	setedit,
	setEditId,
}) {
	const [data, setData] = useState([]);
	const [customer, setCustomer] = useState({});

	useEffect(() => {
		const getData = async () => {
			const data = await AxiosInstance.get(
				`/collection/get/weekly/${customer_id}/`,
			);
			setData(data.data.data);
		};
		const getData1 = async () => {
			const data = await AxiosInstance.get(`/customer/${customer_id}/`);
			setCustomer(data.data);
		};
		getData();
		getData1();
	}, []);

	const delete1 = () => {
		if (window.confirm('Are you sure you want to delete')) {
			AxiosInstance.delete(`/customer/${customer_id}/`).then((res) => {
				toast.success('Customer Deleted');
				window.location.reload();
			});
		}
	};

	return (
		<div className='d-flex flex-column align-items-center justofy-content-center w-100'>
			{!edit ? (
				<div className='bg-light text-align-left align-items-center w-100 p-3 rounded shadow-sm m-2 d-flex flex-row gap-3'>
					<p className='h6'>Customer Name: {customer?.name}</p>
					{customer?.active ? null : (
						<button onClick={delete1} className='btn btn-danger'>
							Delete
						</button>
					)}
					<button className='btn btn-success' onClick={() => setedit(true)}>
						Edit
					</button>
				</div>
			) : null}
			<table className='table table-bordered table-stripped'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						{edit ? <th>Edit</th> : null}
					</tr>
				</thead>
				<tbody>
					{data.length > 0 ? (
						data?.map((details) => (
							<tr>
								<td>{details.date}</td>
								<td>{details.amount}</td>
								{edit ? (
									<td>
										<button
											className='btn btn-primary'
											onClick={(_) => setEditId(details.id)}>
											Edit
										</button>
									</td>
								) : null}
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
	);
}
