import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

const App = () => {
  const [product, setProduct] = useState({
    name: "React from sharozraees802",
    price: 10,
    productBy: "GitHub",
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const Headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:5000/payment", {
      method: "POST",
      Headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("RESPONSE:", res);
        const { status } = res;
        console.log("STATUS:", status);
      })
      .catch((err) => console.log("ERROR:", err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeCheckout
          // stripeKey={process.env.REACT_APP_KEY}
          stripeKey="Public_KEY"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large pink">
            {" "}
            Buy react is just {product.price} ${" "}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
};

export default App;
