
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import "./../../styles/Otherstyles.css";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="profile-title">PROFILE</h4>
        <div className="profile-form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-form-control"
            placeholder="Enter Your Name"
            autoFocus
          />
        </div>
        <div className="profile-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="profile-form-control"
            placeholder="Enter Your Email"
            disabled
          />
        </div>
        <div className="profile-form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="profile-form-control"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="profile-form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="profile-form-control"
            placeholder="Enter Your Phone"
          />
        </div>
        <div className="profile-form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="profile-form-control"
            placeholder="Enter Your Address"
          />
        </div>
        <button type="submit" className="profile-btn-primary">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Profile;
