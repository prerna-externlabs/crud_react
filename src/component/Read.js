import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const Read = () => {
  const [data, SetData] = useState([]);
  function getdata() {
    axios
      .get("https://64be179a2320b36433c80a7d.mockapi.io/project")
      // promise
      .then((res) => {
        console.log(res.data);
        SetData(res.data);
      });
  }
  const handleDelete = (id) => {
    axios.delete(`https://64be179a2320b36433c80a7d.mockapi.io/project/${id}`
    ).then(() => {
      getdata();
    });
  }
  useEffect(() => {
    getdata();
  }, []);

  const setLocalData = (id,name,email) =>{
    localStorage.setItem("id",id);
    localStorage.setItem("name",name);
    localStorage.setItem("email",email);

  }
  

  return (
    <>
      <div className="d-flex justify-content-between m-3">
      <h2>Read </h2>
      <Link to="/">
      <button className="btn btn-secondary">Create</button>
      </Link>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                 <Link to="/update">
                 <button className="btn btn-success" onClick={()=>setLocalData(
                  eachData.id,
                  eachData.name,
                  eachData.email

                 )
                 }>
                 Edit</button>
                 </Link>
                    
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>handleDelete(eachData.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Read;
