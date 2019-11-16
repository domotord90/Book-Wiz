import React, { useState, useEffect } from "react";
import books from "../api/google-books";

import Header from "./Header";
import Search from "./Search";
import BookContainer from "./BookContainer";

import Loader from "react-loader-spinner";

import "../styles/App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [index, setIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [renderHelper, setRenderHelper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (maxResults !== 0) {
      (async () => {
        await books
          .get("volumes", {
            params: {
              key: "AIzaSyDNeBbBMWzv1SasfbC4-kQ36wkS-ZP8hiU",
              q: searchValue,
              maxResults: maxResults,
              startIndex: index
            }
          })
          .then(
            response => {
              setIsLoading(false);
              setItems(response.data.items);
              setTotalBooks(response.data.totalItems);
            },
            error => {
              console.log(error);
            }
          );
      })();
    }
  }, [maxResults, index, renderHelper]);

  return (
    <div className="main-wrapper">
      <div className="header-wrapper">
        <Header />
        <p className="info">You can search the books you want to read below</p>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setItems={setItems}
          index={index}
          setIndex={setIndex}
          maxResults={maxResults}
          setMaxResults={setMaxResults}
          totalBooks={totalBooks}
          setTotalBooks={setTotalBooks}
          renderHelper={renderHelper}
          setRenderHelper={setRenderHelper}
        />
      </div>
      {totalBooks > 0 && !isLoading && (
        <BookContainer
          items={items}
          maxResults={maxResults}
          setMaxResults={setMaxResults}
          searchValue={searchValue}
          index={index}
          setIndex={setIndex}
          setItems={setItems}
          totalBooks={totalBooks}
          setTotalBooks={setTotalBooks}
        />
      )}
      {isLoading && maxResults > 0 && (
        <div className="loading">
          <Loader
            className="loading-dots"
            type="ThreeDots"
            color="rgba(140, 0, 100)"
          />
        </div>
      )}
    </div>
  );
};

export default App;
