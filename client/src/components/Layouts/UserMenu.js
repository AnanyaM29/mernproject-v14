
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Otherstyles.css"
import { useAuth } from "../../context/auth";

const UserMenu = () => {
  const [auth] = useAuth();
  return (
    <div className="user-menu">
      <h4>Profile</h4>
      <ul className="dashboard-list">
      <li>
            <div className="col-md-9 user-menu">
                <h3 className="text-break" style={{maxWidth: '1000px'}}>
                    Name: {auth?.user?.name}
                </h3>
                <h3 className="text-break" style={{maxWidth: '1000px'}}>
                    Email: {auth?.user?.email}
                </h3>
            </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
