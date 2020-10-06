import React, { useState, useEffect } from "react";
import "./Shows.css";
import axios from "../../axios";
import requests from "../../requests";
import Banner from "../Banner/Banner";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Nav from "../Nav/Nav";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [banner, setBanner] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchShowIndex);
      setShows(request.data);
      setBanner(
        request.data[Math.floor(Math.random() * request.data.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const addToFavorite = (show) => {
    console.log("addToFavorite clicked: ", show);
    setFavorite([...favorite, show]);
  };

  console.log("favorite: ", favorite);

  return (
    <>
      <Nav favorite={favorite} />
      <Banner banner={banner} truncate={truncate} />
      <div className="shows">
        <h1>Show Index</h1>

        <div className="shows__posters">
          {shows.map((show) => (
            <div className="shows__poster" key={show.id}>
              <img
                className="shows__posterImage"
                src={`${show.image.medium}`}
                alt={show.name}
              />
              <FavoriteIcon
                className="shows__posterFavIcon"
                onClick={() => addToFavorite(show)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shows;
