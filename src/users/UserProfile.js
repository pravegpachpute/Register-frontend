import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    userId: "",
    image : null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update the image state
    }
  };

  const loadUserProfile = async () => {
    const result = await axios.post(`http://localhost:8084/api/user/updateProfile/${id}`);
    setUser(result.data);
  };

  const getUserProfile = async () => {
    const result = await axios.get(`http://localhost:8084/api/user/getProfile/${id}`);
    setUser(result.data);
  };

return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          {/* Image Upload */}
          <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile
              </label>
              
              {image && (
                <div>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
                <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}// Handle file input
                style={{ display: "block", marginBottom: "10px" }}
              />
          </button>

            <Link className="btn btn-outline-danger mx-2" to="/">
               Remove
            </Link>                

        <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>phono: </b>
                  {user.phono}
                </li>
                <li className="list-group-item">
                  <b>image: </b>
                  {user.image}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}