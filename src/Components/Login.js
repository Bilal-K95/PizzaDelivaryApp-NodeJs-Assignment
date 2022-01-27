import React from "react";
import { Link } from "react-router-dom";
import LoginNav from "./LoginNav";

const Login = () => {
  return (
    <>
     <LoginNav/>
      <div style={{ height: "300px", backgroundColor: "#DCDCDC" }}>
          <div className="container">
        <h1 className="m-4">Pizza Delivery</h1>
        <p className="m-4">
          wlecom to the Pizza Delivery service this is the place when you may
          chose the <br /> most delicious pizza you like from wide variety of
          options!
        </p>
        <hr />
        <p className="m-4">
          we are performing delivery free of charge in case if your order is
          higher than 20$
        </p>
        <Link to="/signup">
        <button type="button" class="btn btn-dark btn-lg btn-block">Sign In and Order</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
