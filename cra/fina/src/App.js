import { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import LoginComponent from './pages/login';
import WeeklyCollectionComponent from './pages/weeeklycollection';
import AddCustomerWeekly from './pages/addCustomerweekly';
import AddMonthlyCustomer from './pages/addMontlhyCustomer';
import Incharge from './pages/incharge';
import ViewIncharge from './pages/viewIncharge';
import MonthlyCollectionComponent from './pages/monthlyCollection';
import { AxiosInstance } from './axios/axios';

function App() {
	const [data1, setData] = useState(null);

	useEffect(() => {
		AxiosInstance.get('/CIH/').then((res) => {
			setData(res.data.data);
		});
	}, []);

	useEffect(() => {
		const token = JSON.parse(localStorage?.getItem('login'))?.token
			? JSON.parse(localStorage?.getItem('login'))?.token
			: 'p';
		AxiosInstance.get(`/verifyuser/${token}`).then(
			(res) => {
				localStorage.removeItem('clear');
			},
			(err) => {
				console.log(err, 'err');
				if (err.response.status === 401) {
					localStorage.setItem('clear', 1);
					localStorage.removeItem('login');
				}
			},
		);
		const clear = localStorage.getItem('clear');
		if (clear === 1) {
			window.location.reload();
		}
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				<Toaster />
				<div>
					<nav class='navbar navbar-expand-lg bg-primary text-white'>
						<div class='container-fluid'>
							<a class='navbar-brand text-white' href='/'>
								Vedha Finance
							</a>
							<button
								class='navbar-toggler '
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#navbarNavAltMarkup'
								aria-controls='navbarNavAltMarkup'
								aria-expanded='false'
								aria-label='Toggle navigation'>
								<span class='navbar-toggler-icon'></span>
							</button>
							<div class='collapse navbar-collapse' id='navbarNavAltMarkup'>
								<div class='navbar-nav'>
									<a class='nav-link text-white' href='/customer'>
										Customer & Collections
									</a>
									<a class='nav-link text-white' href='/Viewincharge'>
										Credit Notes
									</a>
									<a class='nav-link text-white' href='/montlhy'>
										Montlhy Loans
									</a>
									<a
										className='btn text-white'
										href='#'
										onClick={() => {
											localStorage.clear();
											window.location.reload();
										}}>
										Logout
									</a>
								</div>
							</div>
						</div>
					</nav>
				</div>
				{JSON.parse(localStorage.getItem('login')) ? (
					<Routes>
						<Route
							path='/customer'
							element={<WeeklyCollectionComponent />}></Route>
						<Route
							path='/addweeklycustomer'
							element={<AddCustomerWeekly />}></Route>
						<Route
							path='/addmonthlycustomer'
							element={<AddMonthlyCustomer />}></Route>
						<Route path='/incharge' element={<Incharge />}></Route>
						<Route path='/Viewincharge' element={<ViewIncharge />}></Route>
						<Route
							path='/montlhy'
							element={<MonthlyCollectionComponent />}></Route>
						<Route
							path='/'
							element={
								<div className='d-flex flex-row flex-wrap gap-3 p-4'>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded  d-flex flex-column'>
										Total Loans Weekly: {data1?.LoansWeekly.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded  d-flex flex-column'>
										Total Loans Monthly: {data1?.Monthly.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded  d-flex flex-column'>
										Weekly Loan Pending Amount:{' '}
										{data1?.balanceWeekly.balance__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded  '>
										Monthly Loan Pending Amount:{' '}
										{data1?.BalanceMonthly.balance__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded '>
										Total Weekly Collection:{' '}
										{data1?.weeklyCollection.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-md d-card rounded  '>
										Credit Amount: {data1?.inchage.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-md d-card rounded  '>
										Total Intrest: {data1?.intrest.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-3 shadow-sm d-card rounded  d-flex flex-column'>
										Total Montlhy Collection:{' '}
										{data1?.monthlyCollection.amount__sum}
									</div>
									<div
										style={{
											cursor: 'pointer',
											height: 70,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
										}}
										className='p-4 shadow-sm d-card rounded  bg-primary text-white'>
										Cash In Hand: {data1?.cih}
									</div>
								</div>
							}></Route>
					</Routes>
				) : (
					<LoginComponent />
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
