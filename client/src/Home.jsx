import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) =>{
    axios.delete("http://localhost:8081/delete/"+id)
    .then(res => {
        setData(prevData => prevData.filter(customer => customer.id !== id));
    })
    .catch(err=> console.log(err))
  }

  return (
    <div className="d-flex bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <h2>Customer List</h2>
        <div className="d-flex justify-content-end">
            <Link to="/create" className="btn btn-success">Create+</Link>
        </div>
        <table className="table">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((customer, index) => {
            return (
                <tr key={index}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>
            <Link to={`/read/${customer.id}`} className="btn btn-sm btn-info">Read</Link>
            <Link to={`/edit/${customer.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
            <button onClick={()=> handleDelete(customer.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
      </div>
    </div>
  );
};
