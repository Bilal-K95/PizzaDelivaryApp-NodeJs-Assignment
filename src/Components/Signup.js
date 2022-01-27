import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "./LoginNav";
import axios from "axios";

// const regForName = /^[a-zA-Z]{2,100}$/;
// const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// const regForPhone = RegExp(/^[6-9]{1}[0-9]{9}$/);
// const regFroAddress=RegExp;

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password:""
  });
  let data;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    console.log(state);
  };
  const handleOnSubmit = (e) => {
    data = {
      name: state.name,
      email: state.email,
      mobile: state.mobile,
      address: state.address,
      password:state.password,
    };
    const URL = "http://localhost:3001/signup";
    console.log(data,"hiii");
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
  return (
    <>
      <LoginNav />
      <div className="mt-4">
        <h2> Signup </h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter mobile number"
              name="mobile"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter address"
              name="address"
              onChange={handleOnChange}
            />
            </div>
             <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter password"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <Link to="/loginform">
            <button type="submit" value="signup" onClick={handleOnSubmit} className="btn btn-dark">
              Signup
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
