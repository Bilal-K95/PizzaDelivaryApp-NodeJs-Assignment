import React from "react";
import { Link } from "react-router-dom";

const LoginNav = () => {
  return (
    <div className="mt-4">
      <img
        src="Images/pizza-shop-logo.jpg"
        alt="pizzalogo"
        height="150px"
        width="150px"
      />
      <Link to="/signup">
        <button
          type="button"
          className="btn btn-outline-dark"
          style={{ marginLeft: "990px" }}
        >
          Sign Up
        </button>
      </Link>
      <Link to="/loginform">
        
        <button type="button" className="btn btn-outline-dark ml-2">
          Login
        </button>
      </Link>
    </div>
  );
};

export default LoginNav;
