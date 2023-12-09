// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../APIs/RestaurantsFinder";
import { RestaurantContext } from "../context/RestaurantsContext";


const DetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRestaurantData = async () => {
      await RestaurantFinder.get(`/${id}`)
        .then((response) => {
          setSelectedRestaurant(response?.data.restaurant);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchRestaurantData();
  }, [id, setSelectedRestaurant]);

  return (
    <>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <>
          <h1 className="text-center">{selectedRestaurant?.name}</h1>
        </>
      )}
    </>
  );
};

export default DetailsPage;
