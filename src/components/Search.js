import React from "react";

import "../styles/Search.css";

const Search = ({
  searchValue,
  setSearchValue,
  maxResults,
  setMaxResults,
  renderHelper,
  setRenderHelper
}) => {
  const searchOnChange = e => {
    const { value } = e.target;

    setSearchValue(value);
  };

  const searchOnClick = () => {
    if (searchValue !== "") {
      if (maxResults === 0) {
        setMaxResults(40);
      } else {
        setRenderHelper(!renderHelper);
      }
    }
  };

  const searchKeyDown = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      if (searchValue !== "") {
        if (maxResults === 0) {
          setMaxResults(40);
        } else {
          setRenderHelper(!renderHelper);
        }
      }
    }
  };

  return (
    <div className="input-container">
      <input
        onChange={searchOnChange}
        onKeyDown={searchKeyDown}
        value={searchValue}
        className="input-search"
        type="text"
      />
      <button onClick={searchOnClick} className="button-search">
        Search
      </button>
    </div>
  );
};

export default Search;
