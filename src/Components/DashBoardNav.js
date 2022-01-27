import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const DashboardNav = () => {
  const navigate=useNavigate();
  const Logout=()=>
  {
    navigate('/')
  }
  return (
    <div className="mt-4">
      <img
        src="Images/pizza-shop-logo.jpg"
        alt="pizzalogo"
        height="150px"
        width="150px"
      />
     
     <Link to="/menu"> <button type="button" class="btn bg-light "  style={{ marginLeft: "830px" }}>Menu</button></Link>
      <Link to="/cart"><button type="button" class="btn bg-light ml-2">Cart</button></Link>
      <button type="button" class="btn bg-light ml-2">Profile</button>
     
      <button type="button" className="btn btn-outline-dark ml-2" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardNav;
