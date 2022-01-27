import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = () => {
    let token = sessionStorage.getItem("user");
    let tmp = jwt_decode(token);
    let email = tmp.email;
    let list = JSON.parse(sessionStorage.getItem("cart"));
    for (let i = 0; i < list.length; i++) {
      delete list[i]._id;
    }
    axios
      .post(
        "http://localhost:3001/order",
        { email: email, list: list },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.err == 0) {
          sessionStorage.removeItem("cart");
        } else if (res.data.err > 0) {
          alert(res.data.msg);
        }
      })
      .catch((err) => alert("Ordering failed."));
  };
  return (
    <React.Fragment>
      <h3 className="my-2">Checkout</h3>
      <Form.Group controlId="formcreditcard">
        <Form.Label>Credit Card</Form.Label>
        <Form.Control type="number" />
      </Form.Group>
      <p>
        Order Total:{" "}
        <span style={{ fontWeight: "bold" }}>$ {location.state}</span>
      </p>
      <p>
        <Button
          variant="dark"
          onClick={() => {
            order();
            navigate("/order");
          }}
        >
          Checkout
        </Button>
      </p>
    </React.Fragment>
  );
}
