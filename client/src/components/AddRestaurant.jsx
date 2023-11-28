// eslint-disable-next-line no-unused-vars
import React from "react";

const AddRestaurant = () => {
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row d-grid">
          <div className="col-md-5 col-sm-12 px-1">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col-md-5 col-sm-12 px-1">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col-md-2 col-sm-12 px-1 d-flex justify-content-between">
            <select name="" id="" className="custom-select my-1 mr-sm-2 px-1">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
            <button type="button" className="btn btn-primary ">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
