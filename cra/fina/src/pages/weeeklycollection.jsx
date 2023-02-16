import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CollectionHistoryCompnent from './collectionHistory';
import CollectionModel from './collectionModel';
import EditCustomer from './EditCustomer';
import { Button } from '@mui/material';

export default function WeeklyCollectionComponent() {
	const [data, setdata] = useState([]);
	const [search, setsearch] = useState('');
	const [weeks, setweeks] = useState('12');
	const navigate = useNavigate();
	const [cid, setCId] = useState(null);
	const [showHistory, setShowHistory] = useState(false);
	const [showpage, setshowpage] = useState(false);
	const [edit, setedit] = useState(false);

	function dataGet() {
		AxiosInstance.get(`/getcustomer/${weeks}weeks/`).then(
			(res) => {
				setdata(res.data);
			},
			(err) => {
				if (err.response.status === 401) {
					localStorage.clear();
					window.location.reload();
				}
			},
		);
	}

	useEffect(() => {
		dataGet();
	}, [weeks]);

	const addmoney = () => {
		setshowpage(true);
	};

	return (
		<div className='p-3'>
			{edit ? (
				<div
					style={{
						width: '400px',
						backgroundColor: '#f0ebeb',
						zIndex: '99',
						position: 'absolute',
						top: '100px',
						left: '30%',
					}}>
					<EditCustomer setedit={setedit} customer_id={cid ? cid : 0} />{' '}
				</div>
			) : (
				<></>
			)}
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
					<CollectionHistoryCompnent
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
					<CollectionModel
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
					<div className='d-flex flex-row gap-4'>
						<select
							className='form-control'
							onChange={(e) => setweeks(e.target.value)}>
							<option value='' disabled>
								Select Loan Type
							</option>
							<option value='12'>12 Weeks</option>
							<option value='15'>15 weeks</option>
						</select>
					</div>
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
							navigate('/addweeklycustomer');
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
								return weeks.toLocaleLowerCase() === '12'
									? item.periods.includes('12')
									: item.periods.includes('15');
							})
							.filter((item) => {
								return search.toLocaleLowerCase() === ''
									? item
									: item.name.toLocaleLowerCase().includes(search) ||
											item.place.toLocaleLowerCase().includes(search);
							})
							.map((item) => {
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
										<td>{item.amount}</td>
										<td>{item.balance}</td>
										<td>{item.amount - item.balance}</td>
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
