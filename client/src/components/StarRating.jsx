// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fa-solid fa-star"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i className="fa-regular fa-star-half-stroke"></i>);
    } else {
      stars.push(<i className="fa-regular fa-star"></i>);
    }
  }

  return <>{stars}</>;
};

export default StarRating;

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};
