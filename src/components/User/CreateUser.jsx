import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import './User.css';
const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:8000/add-user"
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        role: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            if (user.full_name =="" || user.email =="" || user.role ==""){
                setError("Please check all field is required");
                return false;
            }
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({full_name: "",email: "",role: ""})
                navigate('/show-user');
            } else {
                setError('Form submission failed!');                
            }

        } catch (error) {
            setError(error.message);
            //navigate('/show-user');
        } 
    }

    return (
        <div className='user-form'>
            <div className='text-danger text-center'>
            {error && <p>Error: {error}</p>}
            </div>
            <div className='heading'>
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="full_name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="full_name" name="full_name" value={user.full_name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="role" className="form-label">Phone</label>
                    <select className="form-control" id="role" name="role" onChange={handelInput} >
                      <option value=''>--Select--</option>
                      <option value='Author'>Author</option>
                      <option value='Editor'>Editor</option>
                      <option value='Subscriber'>Subscriber</option>
                      <option value='Administrator'>Administrator</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser
