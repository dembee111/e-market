import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <ShowImage item={product} url="product" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description.substring(0, 50)}</p>
          <p className="card-text">${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
            <button className="btn btn-outline-success mt-2 mb-2">
              Add to card
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
