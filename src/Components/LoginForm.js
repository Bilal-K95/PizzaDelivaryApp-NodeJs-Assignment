import React, { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginNav from "./LoginNav";

export default function LoginForm() {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") != undefined) {
      sessionStorage.removeItem("user");
    }
    if (sessionStorage.getItem("cart") != undefined) {
      sessionStorage.removeItem("cart");
    }
  }, []);

  const login = (e) => {
    e.preventDefault();

    const details = {
      email: email.current.value,
      password: password.current.value,
    };
    const URL = "http://localhost:3001/log";

    axios
      .post(URL, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        if (res.data.err > 0) {
          alert(res.data.msg);
        } else if (res.data.err === 0) {
          alert(`login successful`);

          sessionStorage.setItem("user", res.data.token);
          navigate("/menu");
        }
      });
  };
  return (
    <>
      <LoginNav />
      <div className="mt-4">
        <h2> Login </h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              ref={email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              ref={password}
            />
          </div>

          <button type="submit" className="btn btn-dark" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
