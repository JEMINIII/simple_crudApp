import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
    useEffect(() => {
    axios.get("http://localhost:8081/read/" + id)
      .then(res => {
        console.log(res);
        setCustomer(res.data);
      })
      .catch(err => console.log(err));
  }, [id]); // Include 'id' in the dependency array

  return (
    <div className="d-flex vh-100 bg primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="p-2">
          <h2>Customer Details</h2>
          <h3>{customer[0]?.id}</h3>
          <h3>{customer[0]?.name}</h3>
          <h3>{customer[0]?.address}</h3>
        </div>
        <Link to="/" className="btn btn-primary me-2">Back</Link>
        <Link to={`/edit/${customer[0]?.id}`} className="btn btn-info">Edit</Link>
      </div>
    </div>
  );
};

export default Read;
