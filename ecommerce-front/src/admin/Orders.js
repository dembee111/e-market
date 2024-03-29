import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadOrdersValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadOrdersValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <h3 className="text-info">Total orders: {orders.length}</h3>;
    } else {
      return <h3 className="text-danger">No orders</h3>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );
  const handleStatusChange = (e, orderId) => {
    //
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };
  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name}, you can manage all the orders here`}
      className="container mt-5"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h3 className="mb-5">
                  <span className="bg-primary">Order ID: {o._id}</span>
                </h3>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: {o.amount}</li>
                  <li className="list-group-item">
                    Order on: {moment(o.createdAt).from()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>
                <h4 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h4>
                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{ padding: "20px", border: "1px solid indigo" }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product count", p.count)}
                      {showInput("Product ID", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
