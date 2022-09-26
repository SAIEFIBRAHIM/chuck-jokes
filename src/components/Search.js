import React, { useEffect, useState } from "react";
import searchPng from "../assets/frontend1/search-copy.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setSearch } from "../Redux/Actions/jokesAction";
import popularIcon from "../assets/frontend2/blue-light.png";
import trendingIcon from "../assets/frontend2/green-light.png";
import epicIcon from "../assets/frontend2/red-light.png";
import bg from "../assets/frontend1/bitmap@3x.png";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchList = useSelector((state) => state.allJokes.searchList);
  const [showList, setShowList] = useState("none");

  useEffect(() => {
    if (searchList.length === 0) setShowList("none");
  }, [searchList.length]);

  const handleList = (e) => {
    dispatch(setSearch(e.target.value));
    e.target.value.length > 0 ? setShowList("flex") : setShowList("none");
  };

  const handleSearch = (e) => {
    if (searchList.length === 1) navigate(`/joke/${searchList[0].id}`);
  };
  return (
    <div className="search-main" style={{ backgroundImage: `url(${bg})` }}>
      <div className="headings">
        <div className="heading-1">The Joke Bible</div>
        <h2 className="heading-2">Daily Laughs for you and yours</h2>
      </div>
      <div className="search">
        <input
          type="text"
          className="search-term"
          placeholder="How can we make you laugh today?"
          onChange={(e) => {
            handleList(e);
          }}
          onFocus={(e) => {
            handleList(e);
          }}
          onBlur={(e) => {
            setTimeout(() => {
              setShowList("none");
            }, 200);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          type="submit"
          className="search-button"
          onClick={() => {
            handleSearch();
          }}
        >
          <img src={searchPng} alt="Search" />
        </button>
      </div>
      <div className="search-results" style={{ display: showList }}>
        <div className="results-list">
          {searchList.map((el, i) => (
            <div key={i}>
              <Link className="result-items" to={`/joke/${el.id}`}>
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
                {el.value.slice(0, 22)}
              </Link>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
