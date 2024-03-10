import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Remove Navigate import
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    axios.get("http://localhost:8081/read/" + id)
      .then(res => {
        console.log(res);
        setValues(prevValues => ({
          ...prevValues,
          name: res.data[0].name,
          address: res.data[0].address
        }));
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8081/update/" + id, values)
      .then(res => {
        console.log(res);
        window.location.href = "/"; // Use window.location.href for navigation
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update customer</h2>
          <div className='mb-2'>
            <label htmlFor="Name"></label>
            <input type="text" placeholder='Enter Name' className='form-control' onChange={e => setValues({ ...values, name: e.target.value })} value={values.name} />
          </div>
          <div className='mb-2'>
            <label htmlFor="Address"></label>
            <input type="text" placeholder='Enter Address' className='form-control' onChange={e => setValues({ ...values, address: e.target.value })} value={values.address} />
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
