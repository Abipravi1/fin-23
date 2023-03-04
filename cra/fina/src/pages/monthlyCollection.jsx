import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MakeCollection from './monthly/makeCollection';
import CollectionHistoryCompnentMonthly from './monthly/CoH';
import EditLoans from './monthly/editLoans';
import CloseLoan from './monthly/closeLoan';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormGroup, FormControlLabel } from '@mui/material';

export default function MonthlyCollectionComponent() {
	const [data, setdata] = useState([]);
	const [search, setsearch] = useState('');
	const [weeks, setweeks] = useState('12');
	const navigate = useNavigate();
	const [cid, setCId] = useState(null);
	const [showHistory, setShowHistory] = useState(false);
	const [showpage, setshowpage] = useState(false);
	const [edit, setedit] = useState(false);
	const [close, setClose] = useState(false);
	const [filterActive, setFilterActive] = useState(true);

	function dataGet() {
		AxiosInstance.get(`/getcustomermonthly/`).then((res) => {
			setdata(res.data);
		});
	}

	useEffect(() => {
		dataGet();
	}, [weeks]);

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
						backgroundColor: '#f0ebeb',
						zIndex: '99',
						borderRadius: 10,
						position: 'absolute',
					}}>
					<EditLoans setedit={setedit} customer_id={cid ? cid : 0} />{' '}
				</div>
			) : null}

			{close ? (
				<div
					className='d-flex flex-column gap-3 align-items-start p-3'
					style={{
						position: 'absolute',
						width: '50%',
						zIndex: 1,
						maxHeight: '90%',
						height: '80%',
						overflow: 'auto',
						boxShadow: '-1px 1px 8px #80808059',
						borderRadius: 10,
						backgroundColor: 'white',
					}}>
					<button className='btn btn-primary' onClick={(_) => setClose(false)}>
						Close
					</button>
					<CloseLoan setClose={setClose} customer_id={cid ? cid : 0} />{' '}
				</div>
			) : null}
			{showHistory ? (
				<div
					className='d-flex flex-column gap-3 align-items-start p-3'
					style={{
						position: 'absolute',
						width: '70%',
						zIndex: 1,
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
						flexWrap: 'wrap-reverse',
					}}>
					<input
						className='form-control w-50'
						placeholder='Search Name | Place'
						aria-label='First name'
						onChange={(e) => setsearch(e.target.value)}
					/>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									defaultValue={!filterActive}
									onChange={(e) => setFilterActive((re) => !re)}
								/>
							}
							label='Show Closed Loans'
						/>
					</FormGroup>
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

			<div className='userTable-container table-responsive-sm'>
				{filterActive ? (
					<table className='table table-bordered table-striped table-hover'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Place</th>
								<th>Amount</th>
								<th>Intrest Paid</th>
								<th>Balance</th>
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
								.filter((item) => item.active === true)
								.map((item, aa) => {
									return (
										<tr className='user-table' key={item.id}>
											<>
												<td>{aa + 1}</td>
												<td
													onClick={(_) => {
														setShowHistory(true);
														setCId(item.id);
													}}>
													{item.name}
												</td>
												<td>{item.place}</td>
												<td>{parseInt(item.amount)}</td>
												<td>{parseInt(item.intrest_paid)}</td>
												<td>{item.balance}</td>
												<td className='d-flex gap-4'>
													<Button
														variant='outlined'
														onClick={(_) => {
															setshowpage(true);
															setCId(item.id);
														}}>
														<i class='bi bi-currency-dollar'></i>
														Collect Money
													</Button>
													<Button
														variant='outlined'
														onClick={(_) => {
															setClose(true);
															setCId(item.id);
														}}>
														<i class='bi bi-currency-dollar'></i>
														Close Loan
													</Button>
												</td>
											</>
										</tr>
									);
								})}
						</tbody>
					</table>
				) : (
					<table className='table table-bordered table-striped table-hover'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Place</th>
								<th>Amount</th>
								<th>Intrest Paid</th>
								<th>Start Date</th>
								<th>End Date</th>
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
								.filter((item) => item.active === true)
								.map((item, uid) => {
									return (
										<tr className='user-table' key={item.id}>
											<>
												<td>{uid + 1}</td>
												<td
													onClick={(_) => {
														setShowHistory(true);
														setCId(item.id);
													}}>
													{item.name}
												</td>
												<td>{item.place}</td>
												<td>{parseInt(item.amount)}</td>
												<td>{parseInt(item.intrest_paid)}</td>
												<td>{item.start_date}</td>
												<td>{item.end_date}</td>
												<td className='d-flex gap-4'>
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
											</>
										</tr>
									);
								})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
