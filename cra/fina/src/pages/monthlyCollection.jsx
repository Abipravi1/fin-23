import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MakeCollection from './monthly/makeCollection';
import CollectionHistoryCompnentMonthly from './monthly/CoH';
import { Button } from '@mui/material';
import EditLoans from './monthly/editLoans';

export default function MonthlyCollectionComponent() {
	const [data, setdata] = useState([]);
	const [search, setsearch] = useState('');
	const [weeks, setweeks] = useState('12');
	const navigate = useNavigate();
	const [cid, setCId] = useState(null);
	const [showHistory, setShowHistory] = useState(false);
	const [showpage, setshowpage] = useState(false);
	const [edit, setedit] = useState(false);

	function dataGet() {
		AxiosInstance.get(`/getcustomermonthly/`).then((res) => {
			setdata(res.data);
		});
	}

	useEffect(() => {
		dataGet();
	}, [weeks]);

	const addmoney = () => {
		setshowpage(true);
	};

	function calculate(start_date, end_date, intrest, amount) {
		let date1 = new Date(start_date);
		let date2 = new Date(end_date);
		var Difference_In_Time = date2.getTime() - date1.getTime();
		var diff = Difference_In_Time / (1000 * 3600 * 24);
		let newInt =
			((0.08 * parseFloat(intrest) * parseInt(amount)) / 100) * diff +
			parseInt(amount);
		return newInt !== NaN
			? newInt
			: calculate(start_date, end_date, intrest, amount);
	}

	return (
		<div className='p-3'>
			{edit ? (
				<div
					style={{
						width: '600px',
						backgroundColor: '#f0ebeb',
						zIndex: '99',
						borderRadius: 10,
						position: 'absolute',
						top: '100px',
						left: '30%',
					}}>
					<EditLoans setedit={setedit} customer_id={cid ? cid : 0} />{' '}
				</div>
			) : null}
			{showHistory ? (
				<div
					className='d-flex flex-column gap-3 align-items-start p-3'
					style={{
						position: 'absolute',
						width: '70%',
						zIndex: 1,
						top: '15%',
						left: '15%',
						maxHeight: '70%',
						height: '70%',
						overflow: 'auto',
						boxShadow: '-1px 1px 8px #80808059',
						borderRadius: 10,
						backgroundColor: 'white',
					}}>
					<button
						className='btn btn-primary'
						onClick={(_) => setShowHistory(false)}>
						Close
					</button>
					<CollectionHistoryCompnentMonthly
						setedit={setedit}
						customer_id={cid ? cid : 0}
					/>
				</div>
			) : null}
			{showpage ? (
				<div
					className='d-flex flex-column gap-3 align-items-start p-3'
					style={{
						position: 'absolute',
						width: '70%',
						zIndex: 1,
						top: '15%',
						left: '15%',
						maxHeight: '70%',
						height: '70%',
						overflow: 'auto',
						boxShadow: '-1px 1px 8px #80808059',
						borderRadius: 10,
						backgroundColor: 'white',
					}}>
					<button
						className='btn btn-primary'
						onClick={(_) => setshowpage(false)}>
						Close
					</button>
					<MakeCollection
						calla={dataGet}
						close={setshowpage}
						customer_id={cid ? cid : 0}
					/>
				</div>
			) : null}
			<div className='week-top-section'>
				<div
					className='sortandbutton bg-light p-3 rounded shadow-md'
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: '8px',
					}}>
					<input
						className='form-control w-75'
						placeholder='Search Name | Place'
						aria-label='First name'
						onChange={(e) => setsearch(e.target.value)}
					/>
					<Button
						variant='outlined'
						color='secondary'
						onClick={() => {
							navigate('/addmonthlycustomer');
						}}>
						<i class='bi bi-person-plus-fill'></i>
						Add Loan
					</Button>
				</div>
			</div>

			<div className='userTable-container'>
				<table className='table table-bordered table-striped table-hover'>
					<thead>
						<tr>
							<th> Name</th>
							<th>Place</th>
							<th>Amount</th>
							<th>Balance</th>
							<th>Paid</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data
							.filter((item) => {
								return search.toLocaleLowerCase() === ''
									? item
									: item.name.toLocaleLowerCase().includes(search) ||
											item.place.toLocaleLowerCase().includes(search);
							})
							.map((item) => {
								let { start_date, end_date, intrest, amount } = item;
								const tot = calculate(start_date, end_date, intrest, amount);
								return (
									<tr className='user-table' key={item.id}>
										<td
											onClick={(_) => {
												setShowHistory(true);
												setCId(item.id);
											}}>
											{item.name}
										</td>
										<td>{item.place}</td>
										<td>{parseInt(item.total_amount)}</td>
										<td>{parseInt(item.paid)}</td>
										<td>{parseInt(item.total_amount) - parseInt(item.paid)}</td>
										<td>
											<Button
												variant='outlined'
												onClick={(_) => {
													setshowpage(true);
													setCId(item.id);
												}}>
												<i class='bi bi-currency-dollar'></i>
												Collect Money
											</Button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
