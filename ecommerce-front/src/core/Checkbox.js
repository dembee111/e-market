import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index of -1
    // хэрвээ checked массив дотор id байхгүй бол -1 ийг буцаана байвал нь хэддүгээр index заана
    const currentCategoryId = checked.indexOf(c);

    const newCheckedCategoryId = [...checked];

    // if currently checked was noot already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      // indexof oor haij oluulsan id nii heddeh index deer baigaag splice deer tawij ustguulj bna
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <li
      key={i}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <label className="form-check-label">{c.name}</label>
      <input
        onChange={handleToggle(c._id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(c._id === -1)}
      />
    </li>
  ));
};

export default Checkbox;
