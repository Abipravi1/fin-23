import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosInstance } from '../../axios/axios';

export default function CloseLoan({ customer_id }) {
	const [data, setData] = useState(null);
	const [todayDate, setTodayDate] = useState(
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

	const [int1, setInt1] = useState(null);

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
			const diff =
				end_date !== ''
					? differenceInMonths(start_date, end_date)
					: differenceInMonths(
							start_date,
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
			let newInt = Math.floor(
				(parseInt(amount) / 100) * parseInt(intrest) * diff,
			);
			newInt = newInt.toString();
			return setInt1(newInt);
		} else {
			return '';
		}
	}

	useEffect(() => {
		calculate();
	}, [data]);

	const saveIntrest = () => {
		AxiosInstance.post(`collection/save/montlhy/intrest/`, {
			customer_id,
			customer_name: data?.name,
			amount: int1,
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
				toast.success(`Intrest Amount ${int1} saved...`);
			},
			(err) => toast.error('Error Saving Intrest..'),
		);
	};

	const savePrinciple = (bal) => {
		AxiosInstance.post(`collection/save/montlhy/principle/`, {
			customer_id,
			customer_name: data?.name,
			amount: data?.balance,
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
				AxiosInstance.post(`close/monthlyloan/`, {
					customer_id: data?.id,
				}).then((res) => toast.success('Loan Closed Successfully'));
			},
			(err) => toast.error('Error Saving Amount..'),
		);
	};

	const Save = async () => {
		if (window.confirm('Are you sure you want to save?')) {
			if (data?.intrest_paid < int1) {
				await saveIntrest();
			}
			await savePrinciple();
			window.location.reload();
		}
	};

	return (
		<div className='p-3 w-100'>
			<div className='d-flex flex-column gap-2 w-100'>
				<p>Customer Name: {data?.name}</p>
				<p>Place: {data?.place}</p>
				<p>Loan Date: {data?.start_date}</p>
				<p>Loan Amount: {data?.amount}</p>
				<p className='badge bg-warning'>Loan Amount Paid: {data?.total_paid}</p>
				{data?.active ? (
					<p className='d-flex flex-row gap-3'>
						End Date:{' '}
						<input
							type='date'
							className='form-control w-50'
							defaultValue={data?.end_date ? data?.end_date : todayDate}
							onChange={(e) => setData({ ...data, end_date: e.target.value })}
						/>
					</p>
				) : (
					<p>End Date: {data?.end_date}</p>
				)}
				<p>Intrest: {int1}</p>
				<p className='badge bg-warning'>
					Intrest Paid: {parseInt(data?.intrest_paid)}
				</p>
				<p className='badge bg-primary'>
					Total:{' '}
					{parseInt(data?.balance) +
						parseInt(int1) -
						parseInt(data?.intrest_paid)}
				</p>
			</div>
			<button className='m-3' onClick={Save} style={{ border: '' }}>
				Close Loan
			</button>
		</div>
	);
}
