import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useProduct from "../../Hooks/useProduct";

const ProductUpdate = () => {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useProduct(productId);
  const { img, price, name, suplayerName, quantity } = singleProduct;
  const handleQuantityManage = () => {
    const confirm = window.confirm("Are You Sure");
    if (confirm) {
      // const newQuantity =
      const newQuantity = quantity - 1;
      const updateUser = { quantity: newQuantity };
      const url = `https://mysterious-temple-59624.herokuapp.com/product/${productId}`;
      fetch(url, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Delivered Product SuccessFull");
          }
        });
    }
  };
  const quantityRef = useRef("");
  const handleQuantityUpdate = (e) => {
    e.preventDefault();
    const inputQuantity = quantityRef.current.value;
    const newQuantity = parseInt(inputQuantity) + parseInt(quantity);
    console.log(newQuantity);
    if (!newQuantity) {
      return toast.error("Please Type A Quantity");
    } else if (isNaN(newQuantity)) {
      return toast.error("This Is Not A Number");
    }
    const updateUser = { quantity: newQuantity };
    const url = `https://mysterious-temple-59624.herokuapp.com/product/${productId}`;
    fetch(url, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Product Added SuccessFull");
          e.target.reset();
          // window.location.reload(true);
        }
      });
  };
  return (
    <div className="container ">
      <div
        className="card mb-3 mx-auto my-5 shadow"
        style={{ maxWidth: "540px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img src={img} className="img-fluid rounded-start mt-4" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title text-warning">{name}</h3>
              <h5>Price ${price}</h5>
              <p className="card-text">
                {singleProduct?.description?.slice(0, 150) + "..."}
              </p>
              <p className="card-text text-primary">
                Suplyer Name: {suplayerName}
              </p>
              {quantity == 0 ? "" : <h5>Quantity: {quantity}</h5>}
              <div className="text-center mt-5">
                {quantity == 0 ? (
                  <h6 className="w-100 bg-danger py-2 text-light rounded">
                    Sold
                  </h6>
                ) : (
                  <button
                    onClick={handleQuantityManage}
                    className="btn border-success shadow-none rounded-0 text-success"
                  >
                    Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container my-4">
        <Form onSubmit={handleQuantityUpdate} className="p-4 shadow ">
          <h4 className="text-center fw-bold text-warning">{name}</h4>
          <h5 className="text-center text-danger">Quantity: {quantity}</h5>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Add Products</Form.Label>
            <Form.Control
              ref={quantityRef}
              className="shadow-none border-warning"
              type="text"
              placeholder="Add Products"
            />
          </Form.Group>
          <div className="text-center">
            <Button
              className="w-100 shadow-none"
              variant="warning"
              type="submit"
            >
              Add Products
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductUpdate;
