// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../APIs/RestaurantsFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

// eslint-disable-next-line no-unused-vars
const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  useEffect(() => {
    const fetchRestaurantData = async () => {
      await RestaurantFinder.get("/")
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => console.log(error));
    };

    fetchRestaurantData();
  }, [setRestaurants]);

  return (
    <div className="list-group">
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants ? (
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant?.id}>
                  <td>{restaurant?.name}</td>
                  <td>{restaurant?.location}</td>
                  <td>{"$".repeat(restaurant?.price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      Update
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Shakeys</td>
              <td>Malate</td>
              <td>$$</td>
              <td>Rating</td>
              <td>
                <button type="button" className="btn btn-warning">
                  Update
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
