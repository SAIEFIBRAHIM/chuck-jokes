import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setJokes } from "../Redux/Actions/jokesAction";
import popularIcon from "../assets/frontend2/blue-light.png";
import trendingIcon from "../assets/frontend2/green-light.png";
import epicIcon from "../assets/frontend2/red-light.png";
import seeStats from "../assets/frontend1/path-copy-4@2x.png";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const JokeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jokes = useSelector((state) => state.allJokes.fJokes);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(9);

  useEffect(() => {
    const fechJokes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/search?query=all"
        );
        dispatch(setJokes(response.data));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fechJokes();
  }, [dispatch]);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={[
            "#ff5b5b",
            "#ff915b",
            "#ffbe5b",
            "#ffdf5b",
            "#8fe360",
            "#57e690",
          ]}
        />
      </div>
    );

  return (
    <div className="main">
      <div className="joke-list">
        {jokes.slice(0, more).map((el, i) => (
          <div className="joke-card" key={i}>
            <div className="joke-card-header">
              <img
                src={
                  el.likes <= 50
                    ? popularIcon
                    : el.likes <= 100
                    ? trendingIcon
                    : epicIcon
                }
                alt="Icon"
              />
              <h1>{`${
                el.categories.length !== 0
                  ? el.categories[0].toUpperCase()
                  : "UNCATEGORIZED"
              } JOKE`}</h1>
            </div>
            <div className="joke-card-body">
              <p>
                {el.value.length > 210
                  ? `${el.value.slice(0, 210)} ...`
                  : el.value}
              </p>
            </div>
            <div
              className="joke-card-footer"
              onClick={() => {
                navigate(`/joke/${el.id}`);
              }}
            >
              <span>SEE STATS</span>
              <img src={seeStats} alt="SEE STATS" />
            </div>
          </div>
        ))}
      </div>
      <div className="list-nav">
        {more < jokes.length ? (
          <button
            onClick={() => {
              setMore(more + 12);
            }}
            className="load-more"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default JokeList;
