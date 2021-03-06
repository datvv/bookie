import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Product from "./Product";

const Checkout = () => {
  const { cart } = useSelector((state) => state.user);

  return (
    <div className="checkout">
      <h1 className="checkout__title">Cart</h1>
      {cart && cart.length
        ? cart.map((product) => (
            <Product
              id={product._id}
              key={product._id}
              amount={product.total}
              title={product.title}
              price={product.price}
              old_price={product.old_price}
              imgURL={product.imgURL}
            />
          ))
        : null}
      {cart.length ? (
        <div className="checkout__pay">
          <div className="checkout__pay--total">
            <p>Total:</p>
            <div>
              {cart
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    currentValue.total * currentValue.price * 1000,
                  0
                )
                .toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </div>
          </div>

          <Link to="/checkout/payment" className="checkout__pay--button">
            Check out
          </Link>
        </div>
      ) : (
        <div className="checkout__empty">
          <p className="checkout__empty--text">No products in the cart</p>
          <Link to="/" className="checkout__empty--link">
            Back to shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
