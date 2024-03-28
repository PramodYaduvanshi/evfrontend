import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowUser = () => {
  const showUserApi = "http://localhost:8000/api/user-list";

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(showUserApi).then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.full_name}</td>
                  <td>{item.email_id}</td>
                  <td>{item.role}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
