import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import axios from "axios";
//import { Toast } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phono: "",
  });

  const { id } = useParams();

  // const [userId, setUserId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    loadUser();
    fetchProfileImage();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8084/api/user/get/${id}`);
    setUser(result.data);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload profile image
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:8084/api/user/updateProfile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data); // Display success message
      fetchProfileImage();
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload the image.");
    }
  };

  // Handle fetching the profile image
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/user/getProfile/${id}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );
      const imageUrl = URL.createObjectURL(response.data); // Create a URL for the image blob
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching the image:", error);
      alert("Failed to fetch the profile image.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">
            User Details
          </h2>

          {imageUrl && (
            <div style={{ marginTop: "20px" }}>
              {/* <h2>Profile Image:</h2> */}
              <img
                src={imageUrl}
                alt="User Profile"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ marginTop: "10px" }}>
            {/* <label>Profile Image:</label> */}
            <input
              type="file"
              onChange={handleFileChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleUpload} style={{ marginRight: "10px" }}>
              Upload Image
            </button>
            {/* <button onClick={fetchProfileImage}>Fetch Image</button> */}
          </div>
          <br></br>

          <div className="card">
            <div className="card-header">
              Details of User ID : {user.id}
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
                  <b>Phone-Number: </b>
                  {user.phono}
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