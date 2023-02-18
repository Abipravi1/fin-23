	import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../axios/axios';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';

export default function ViewIncharge() {
	const [data, setData] = useState([]);
	const [showpage,setshowpage]=useState(false);
	const [selectedrow,setselectedrow]=useState(null)
	const [newData,setnewData]=useState([]);
	const [inputValue,setInputValue]=useState('');
	const selectedUserData=selectedrow?data.find(row=> row.id ===selectedrow):null
    

    const handleAddNewData=()=>{
		if (inputValue !==''){
			const date=new Date().toLocaleString();
			setnewData(prevData=>[...prevData, {date, value:inputValue}])
			setInputValue("")
		}
	}
	const handleEdit=(index)=>{
     const newValue=prompt("enter a new value",newData[index].value);
	 if(newValue !== null){
		setnewData(prevData=>{
			const newDataCopy=[...prevData];
			newDataCopy[index].value=newValue;
			return newDataCopy;
		})
	 }
	}

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
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 ? (
							data?.map((details) => (
								<tr   onClick={()=> setselectedrow(details.id)}  >
									<td>{details.name}</td>
									<td>{details.place}</td>
									<td>{details.contact}</td>
									<td>{details.amount}</td>
									<td>
										<button
											onClick={(e) => {
												setshowpage(true)
												delete1(details.id)
											     console.log(details.name);                  }
											                       }
												
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

			{showpage ?<div className='popup'>

				<div  style={{height:"400px",width:"800px",position:"absolute",top:"150px", left:"300px",zIndex:"2", backgroundColor:"wheat"}} >
				<Button variant="primary" style={{margin:"20px 20px"}} onClick={()=> setshowpage(false)} >close</Button>
          
                 <div>
				<h6  style={{marginLeft:"20px",marginTop:"20px"}}  >{selectedUserData?.name}</h6>
             <div>  <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
				<TextField style={{width:"200px",marginLeft:"20px",marginTop:"80px"}}
						id='outlined-basic'
						
						label='Amount'
						size='small'
						type='number'
						className='form-control'
						variant='outlined'
					/>

                <Button onClick={handleAddNewData} style={{width:"200px",marginTop:"20px",marginLeft:"20px"}} variant="success">Save</Button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Value</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
                          {newData.map((row,index)=>{
							<tr key={index}>
                              <td>{row.date}</td>
							  <td>{row.value}</td>
							  <td><button onClick={()=> handleEdit(index)}  >edit</button></td>

							</tr>
						  })}
                             

						</tbody>
					</table>
				</div>
				</div>
               
				 </div>

				</div>
			</div>:<></> }	
               

				
			</div>
		</div>
	);
}
