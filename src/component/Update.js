import axios from 'axios';
import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {

    const [id, SetId] = useState("0");
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");

    useEffect(()=>{
        SetId(localStorage.getItem("id"));
        SetName(localStorage.getItem("name"));
        SetEmail(localStorage.getItem("email"));

    },[])

    const navigate = useNavigate();

    const handleupdate = (e)=>{
        e.preventDefault();
        axios.put(
            `https://64be179a2320b36433c80a7d.mockapi.io/project/${id}`,{
                name : name ,
                email : email,
              
            }
            ).then(()=>{
              navigate('/read');
            });
    }
  return (
    <>
    <h2>Update</h2>
    <form>
    <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="name" className="form-control" name='name' value={name} onChange={(e)=>{SetName(e.target.value)}}/>
    </div>
    <div className="mb-3">
    <label class="form-label">Email</label>
    <input type="email" className="form-control" name='email'  value={email} onChange={(e)=>{SetEmail(e.target.value)}}/>
    </div>
    <button type="submit" className='btn btn-primary' onClick={handleupdate}>Submit</button>
    <button type="submit" className='btn btn-primary'>Back</button>
    </form>
    </>
  )
}

export default Update;