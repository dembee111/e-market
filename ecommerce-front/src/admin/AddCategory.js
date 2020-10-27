import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="mb-3 mt-5">
        <label className="text-muted mb-2">Category Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autofocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div class="alert alert-success" role="alert">
          Successfully created
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div class="alert alert-danger" role="alert">
          Category should be unique
        </div>
      );
    }
  };

  const goBack = () => {
    if (error) {
      return (
        <div class="alert alert-danger" role="alert">
          Category should be unique
        </div>
      );
    }
  };

  return (
    <Layout
      title="Add a new Category"
      description={`G'day ${user.name}, ready to add a new category`}
      className="container mt-5"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
