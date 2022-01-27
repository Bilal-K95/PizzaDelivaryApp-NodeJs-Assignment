import React from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h3 className="my-2">Order has been placed successfully!</h3>
      <Alert variant="success">
        You will receive notification by email with order details.
      </Alert>
      <p>
        <Button variant="dark" onClick={() => navigate("/menu")}>
          Go an order some more
        </Button>
      </p>
    </React.Fragment>
  );
}
