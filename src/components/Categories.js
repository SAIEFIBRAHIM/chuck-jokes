import axios from "axios";
import React, { useState, useEffect } from "react";
import arrowDown from "../assets/frontend1/path-copy-7@3x.png";
import { useDispatch } from "react-redux";
import { setCategory } from "../Redux/Actions/jokesAction";
import { ColorRing } from "react-loader-spinner";
const Categories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(7);
  const [rotation, setRotation] = useState(0);
  const [viewText, setViewText] = useState("SHOW ALL");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fechCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/categories"
        );
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fechCategories();
  }, []);
  useEffect(() => {
    const checkRotation = () => {
      view > 7 ? setRotation(180) : setRotation(0);
      view > 7 ? setViewText("SHOW LESS") : setViewText("VIEW ALL");
    };
    checkRotation();
  }, [view]);
  const catColors = [
    "fancyred",
    "pastelorange",
    "paleorange",
    "lightgold",
    "kiwigreen",
    "weirdgreen",
    "skyblue",
    "fancyred",
    "pastelorange",
    "paleorange",
    "lightgold",
    "kiwigreen",
    "weirdgreen",
    "skyblue",
    "fancyred",
    "pastelorange",
  ];

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

  const handleViewMore = () => {
    view === 7 ? setView(data.length) : setView(7);
  };
  const handleCategory = (el) => {
    dispatch(setCategory(el));
    setSelectedCategory(el.toUpperCase());
  };
  return (
    <div className="main">
      <div className="cats">
        {data.slice(0, view).map((el, i) => (
          <button
            className={`category ${catColors[i]}`}
            key={i}
            onClick={() => {
              handleCategory(el);
            }}
          >
            {`${el.toUpperCase()} JOKES`}
          </button>
        ))}
        <button
          className="category view-more"
          onClick={() => {
            handleViewMore();
          }}
        >
          {viewText}
          <img
            src={arrowDown}
            style={{ rotate: `${rotation}deg` }}
            alt="View all"
          />
        </button>
      </div>
      <div>
        <hr className="category-hr" />
        <span className="category-jl">
          {!selectedCategory ? "RANDOM JOKES" : `${selectedCategory} JOKES`}
        </span>
      </div>
    </div>
  );
};

export default Categories;
