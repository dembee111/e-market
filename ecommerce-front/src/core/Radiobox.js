import React, { useState, useEffect, Fragment } from "react";

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type="radio"
        className="form-check-input mr-3"
        name={p}
        value={`${p._id}`}
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};
export default Radiobox;
