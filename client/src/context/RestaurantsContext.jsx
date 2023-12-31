import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props?.children}
    </RestaurantContext.Provider>
  );
};

RestaurantContextProvider.propTypes = {
  children: PropTypes.object.isRequired, // Add the missing prop type validation
};
