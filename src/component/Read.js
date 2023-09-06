import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const Read = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

 
  const filteredData = data.filter((item) => {
    if (item.name) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false; 
  });

  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  function fetchData() {
    axios
      .get("https://64be179a2320b36433c80a7d.mockapi.io/project")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`https://64be179a2320b36433c80a7d.mockapi.io/project/${id}`)
      .then(() => {
        fetchData();
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const setLocalData = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  function goToPreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
    
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    }

  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <h2>Read</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
        <tbody>
          {records.map((eachData) => (
            <tr key={eachData.id}>
              <th scope="row">{eachData.id}</th>
              <td>{eachData.name}</td>
              <td>{eachData.email}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() => setLocalData(eachData.id, eachData.name, eachData.email)}
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(eachData.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={goToPreviousPage}>Previous</button>
          </li>
          {numbers.map((pageNumber) => (
            <li className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} key={pageNumber}>
              <button className="page-link" onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={goToNextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Read;
