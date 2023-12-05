// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFinder from "../APIs/RestaurantsFinder";

const DetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchRestaurantData = async () => {
      await RestaurantFinder.get(`/${id}`)
        .then((response) => {
          setName(response?.data?.restaurant?.name);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchRestaurantData();
  }, [id]);
  return (
    <div>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <h1 className="text-center">{name}</h1>
      )}
    </div>
  );
};

export default DetailsPage;
