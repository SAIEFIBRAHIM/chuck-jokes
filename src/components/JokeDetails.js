import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backToHome from "../assets/frontend2/arrow-left@2x.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSelected } from "../Redux/Actions/jokesAction";
import { setLike } from "../Redux/Actions/jokesAction";
import { setDislike } from "../Redux/Actions/jokesAction";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import Like from "../assets/frontend2/hand@2x.png";
import Dislike from "../assets/frontend2/hand-copy@2x.png";
import Back from "../assets/frontend2/arrow-left.png";
import Next from "../assets/frontend2/arrow-left-copy.png";

const JokeDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const joke = useSelector((state) => state.allJokes.selectedJoke);
  const jokes = useSelector((state) => state.allJokes.fJokes);
  const [loading, setLoading] = useState(true);
  const [currJ, setCurrJ] = useState(0);

  useEffect(() => {
    const fetchSingleJoke = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.chucknorris.io/jokes/${params.id}`
        );
        dispatch(setSelected(response.data));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSingleJoke();
  }, [dispatch, params.id]);

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
  const handleNextJoke = () => {
    currJ === jokes.length - 1 ? setCurrJ(0) : setCurrJ(currJ + 1);
    navigate(`/joke/${jokes[currJ].id}`);
    console.log(currJ);
  };
  const handlePrevJoke = () => {
    currJ === 0 ? setCurrJ(jokes.length - 1) : setCurrJ(currJ - 1);
    navigate(`/joke/${jokes[currJ].id}`);
    console.log(currJ);
  };
  return (
    <div className="main">
      <div
        className="back-home"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={backToHome} alt="Back To Home" />
        <p>Back To Home</p>
      </div>
      <div className="detail-body">
        <div className="joke-value-wrapper">
          <div className="joke-value">
            <div className="head-joke">
              <div className="popularity">
                <span className="category-jl">
                  {joke.categories.length === 0
                    ? "UNCATEGORIZED JOKES"
                    : `${joke.categories[0].toUpperCase()} JOKES`}
                </span>
                <li
                  className={`joke-stat ${
                    joke.likes <= 50
                      ? "weirdgreen-color"
                      : joke.likes <= 100
                      ? "paleorange-color"
                      : "fancyred-color"
                  }`}
                >
                  {joke.likes <= 50
                    ? "POPULAR"
                    : joke.likes <= 100
                    ? "TRENDING"
                    : "EPIC"}
                </li>
              </div>
              <h1>{joke.value.slice(0, 22)}</h1>
              <p>{joke.value}</p>
            </div>
          </div>
          <div className="nav-joke">
            <div className="joke-ratings">
              <div className="reaction-wrapper like-wrapper">
                <button
                  className="like"
                  onClick={() => {
                    dispatch(setLike());
                  }}
                >
                  <img src={Like} alt="Like" />
                </button>
                <p>{joke.likes}</p>
              </div>
              <div className="reaction-wrapper dislike-wrapper">
                <button
                  className="dislike"
                  onClick={() => {
                    dispatch(setDislike());
                  }}
                >
                  <img src={Dislike} alt="Dislike" />
                </button>
                <p>{joke.dislikes}</p>
              </div>
            </div>
            <div className="joke-navigation">
              <button
                className="nav-button"
                onClick={() => {
                  handlePrevJoke();
                }}
              >
                <img src={Back} alt="Prev" />
                PREV. JOKE
              </button>
              <button
                className="nav-button"
                onClick={() => {
                  handleNextJoke();
                }}
              >
                NEXT JOKE
                <img src={Next} alt="Next" />
              </button>
            </div>
          </div>
        </div>
        <div className="top-jokes">
          <div className="top-jokes-wrapper">
            <h1>THE TOP 10 JOKES THIS WEEK</h1>
            {jokes
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 10)
              .map((el, i) => (
                <Link key={i} className="top-jokes-links" to={`/joke/${el.id}`}>
                  {el.value.slice(0, 20)}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeDetails;
