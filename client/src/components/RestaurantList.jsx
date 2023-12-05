// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../APIs/RestaurantsFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurantData = async () => {
      await RestaurantFinder.get("/")
        .then((response) => {
          setRestaurants(response?.data?.restaurants);
        })
        .catch((error) => console.log(error));
    };

    fetchRestaurantData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await RestaurantFinder.delete(`/${id}`)
      .then((response) => {
        setRestaurants(
          restaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

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
                <tr
                  key={restaurant?.id}
                  onClick={() => {
                    navigate(`/restaurants/${restaurant?.id}`);
                  }}
                >
                  <td>{restaurant?.name}</td>
                  <td>{restaurant?.location}</td>
                  <td>{"$".repeat(restaurant?.price_range)}</td>
                  <td>Reviews</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant?.id)}
                      type="button"
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant?.id)}
                      type="button"
                      className="btn btn-danger"
                    >
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
