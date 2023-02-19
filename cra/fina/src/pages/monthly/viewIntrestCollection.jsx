import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../axios/axios';
import toast from 'react-hot-toast';

export default function ViewIntrestCollection({
	customer_id,
	edit,
	setedit,
	setColType,
	setEditId,
}) {
	const [data, setData] = useState([]);
	const [customer, setCustomer] = useState({});

	useEffect(() => {
		const getData1 = async () => {
			const data = await AxiosInstance.get(`/intrestdata/${customer_id}/`);
			setData(data.data.data);
		};
		getData1();
	}, []);

	return (
		<div className='d-flex flex-column align-items-center justofy-content-center w-100'>
			<table className='table table-bordered table-stripped'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						{edit ? <th>Edit</th> : null}
					</tr>
				</thead>
				<tbody>
					{data?.length > 0 ? (
						data?.map((details) => {
							return (
								<tr>
									<td>{details.date}</td>
									<td>{details.amount}</td>
									{edit ? (
										<td>
											<button
												className='btn btn-primary'
												onClick={(_) => {
													setEditId(details.id);
													setColType('intrest');
												}}>
												Edit
											</button>
										</td>
									) : null}
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
	);
}
