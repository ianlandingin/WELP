// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import RestaurantFinder from "../APIs/RestaurantsFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const body = {
      name,
      location,
      price_range: priceRange,
    };
    e.preventDefault();
    setLoading(true);
    await RestaurantFinder.post("/", body)
      .then((response) => {
        setLoading(false);
        console.log(response);
        addRestaurants(response?.data?.data?.restaurant);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.message);
      });
  };
  return (
    <div className="mb-4">
      {loading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <form action="">
          <div className="form-row row">
            <div className="col-lg-5 col-md-4 col-sm-12 px-1">
              <input
                value={name}
                onChange={(e) => setName(e?.target?.value)}
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder="name"
              />
            </div>
            <div className="col-lg-5 col-md-4 col-sm-12 px-1">
              <input
                value={location}
                onChange={(e) => setLocation(e?.target?.value)}
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder="location"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-12 px-1 d-flex justify-content-around">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e?.target?.value)}
                name=""
                id=""
                className="custom-select mr-sm-2 px-1"
              >
                <option disabled value="">
                  Price Range
                </option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddRestaurant;
