import React, { useEffect, useState } from "react";
import DashboardNav from "./DashBoardNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menu, setmenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let temp = sessionStorage.getItem("user");
    const URL = "http://localhost:3001/menu";
    axios
      .get(URL, {
        headers: { Authorization: `Bearer ${temp}` },
      })
      .then((res) => {
        if (res.data.err == 1) {
          navigate("/");
        }
        setmenu(res.data);
      });
  }, []);

  const cart = (element) => {
    if (sessionStorage.getItem("cart") != undefined) {
      let tmp = JSON.parse(sessionStorage.getItem("cart"));
      // console.log(tmp.filter(ele => ele.name == element.name))
      if (tmp.filter((ele) => ele.name == element.name).length === 0) {
        tmp.push(element);
        sessionStorage.setItem("cart", JSON.stringify(tmp));
      }
    } else {
      sessionStorage.setItem("cart", JSON.stringify([element]));
    }
  };
  return (
    <>
      <DashboardNav />
      <h2>Menu</h2>
      <div className="row">
        {menu &&
          menu.map((item) => (
            <div className="col-sm mt-4">
              <div class="card" style={{ width: "18rem" }}>
                <img
                  class="card-img-top"
                  src={item.path}
                  alt="Card image cap"
                  style={{ height: "200px" }}
                />
                <div class="card-body" align="center">
                  <h5 class="card-title">{item.name}</h5>
                  <p class="card-text text-danger">${item.price}</p>
                  <button class="btn btn-dark" onClick={() => cart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Menu;
