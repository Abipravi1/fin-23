import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../../axios/axios';

export default function CloseLoan({ customer_id }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		AxiosInstance.get(`/customer/monthly/${customer_id}/`).then((res) =>
			setData(res.data),
		);
	}, []);

	function differenceInMonths(date1, date2) {
		date1 = new Date(date1);
		date2 = new Date(date2);
		const monthDiff = date2.getMonth() - date1.getMonth();
		const yearDiff = date2.getYear() - date1.getYear();

		return monthDiff + yearDiff * 12;
	}

	function calculate() {
		if (data) {
			let { start_date, end_date, intrest, amount } = data;
			const diff = differenceInMonths(start_date, end_date);
			let newInt =
				end_date !== ''
					? Math.floor((parseInt(amount) / 100) * parseInt(intrest) * diff)
					: Math.floor((parseInt(amount) / 100) * parseInt(intrest) * 1);
			newInt = newInt.toString();
			return newInt;
		} else {
			return '';
		}
	}

	return (
		<div className='p-3 w-100'>
			<div className='d-flex flex-column gap-2 w-100'>
				<p>Customer Name: {data?.name}</p>
				<p>Place: {data?.place}</p>
				<p>Loan Date: {data?.start_date}</p>
				<p>Loan Amount: {data?.amount}</p>
				<p className='badge bg-warning'>Loan Amount Paid: {data?.total_paid}</p>
				<p className='d-flex flex-row gap-3'>
					End Date:{' '}
					<input
						type='date'
						className='form-control w-50'
						defaultValue={data?.end_date}
						onChange={(e) => setData({ ...data, end_date: e.target.value })}
					/>
				</p>
				<p>Intrest: {calculate()}</p>
				<p className='badge bg-warning'>
					Intrest Paid: {parseInt(data?.intrest_paid)}
				</p>
			</div>
		</div>
	);
}
