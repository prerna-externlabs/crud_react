import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

const Create = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");

  const history = useNavigate();

  const headers = { "Access-Control-Allow-Origin": "*" };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://64be179a2320b36433c80a7d.mockapi.io/project", {
        name: name,
        email: email,
        headers,
      })
      // history('/read');

      .then(() => {
        history("/read");
      });
  };

  return (
    <>
    
    <div className="d-flex justify-content-between m-3">
      <h2>Create</h2>
      <Link to="/read">
      <button className="btn btn-primary">Show Data</button>
      </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="name"
            className="form-control"
            name="name"
            onChange={(e) => {
              SetName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handlesubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
