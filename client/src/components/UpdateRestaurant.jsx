import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFinder from "../APIs/RestaurantsFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchRestaurantData = async () => {
      await RestaurantFinder.get(`/${id}`)
        .then((response) => {
          setRestaurant(response?.data?.restaurant);
          setName(restaurant?.name);
          setLocation(restaurant?.location);
          setPriceRange(restaurant?.price_range);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchRestaurantData();
  }, [
    setRestaurant,
    id,
    restaurant?.name,
    restaurant?.location,
    restaurant?.price_range,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      name,
      location,
      price_range: priceRange,
    };

    await RestaurantFinder.put(`/${id}`, body)
      .then((response) => {
        alert("Update success!");
        console.log(response);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert("Update error. Check console");
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target?.value)}
              id="name"
              type="text"
              className="form-control"
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              onChange={(e) => setLocation(e.target?.value)}
              id="location"
              type="text"
              className="form-control"
              value={location}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input
              onChange={(e) => setPriceRange(e.target?.value)}
              id="price_range"
              type="number"
              className="form-control"
              min="1"
              max="5"
              value={priceRange}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateRestaurant;
