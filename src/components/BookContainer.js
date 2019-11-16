import React from "react";

import placeholder from "../images/placeholder.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "../styles/BookContainer.css";

const BookContainer = ({
  items,
  maxResults,
  setMaxResults,
  index,
  setIndex,
  totalBooks
}) => {
  const itemLister = () => {
    const tempArray = [];
    items.map(item => {
      tempArray.push(
        <div className="book-container" key={`${item.id}`}>
          <a
            className="book-image-link"
            target="_blank"
            rel="noopener noreferrer"
            href={item.volumeInfo.infoLink}
          >
            <img
              className="book-img"
              src={
                item.volumeInfo.hasOwnProperty("imageLinks")
                  ? `${item.volumeInfo.imageLinks.thumbnail}`
                  : placeholder
              }
              alt="Book cover"
            />
          </a>
          <div className="book-info-container">
            <p className="book-title">{` ${item.volumeInfo.title}`}</p>
            <p className="book-authors">
              {item.volumeInfo.hasOwnProperty("authors")
                ? `${item.volumeInfo.authors}`
                : `Unknown author`}
            </p>
            {item.volumeInfo.hasOwnProperty("categories") && (
              <p className="book-categories">{`${item.volumeInfo.categories}`}</p>
            )}
            <div className="link-container">
              <a
                className="book-link"
                rel="noopener noreferrer"
                target="_blank"
                href={item.volumeInfo.infoLink}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
      return item;
    });
    return tempArray;
  };

  const maxResultOnChange = e => {
    const { value } = e.target;
    setMaxResults(parseInt(value, 10));
  };

  const prevPageOnClick = () => {
    if (index - maxResults < 0) {
      setIndex(0);
    } else {
      setIndex(index - maxResults);
    }
  };

  const nextPageOnClick = () => {
    setIndex(index + maxResults);
  };

  return (
    <div className="books-container-wrapper">
      <div className="books-container">{itemLister()}</div>
      <div className="results-navigation">
        {index !== 0 && (
          <FontAwesomeIcon
            onClick={prevPageOnClick}
            className="navigation-arrow"
            icon={faArrowLeft}
          />
        )}
        <select
          onChange={maxResultOnChange}
          className="max-results-selector"
          value={maxResults}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>
        {index + maxResults < totalBooks && (
          <FontAwesomeIcon
            onClick={nextPageOnClick}
            className="navigation-arrow"
            icon={faArrowRight}
          />
        )}
      </div>
    </div>
  );
};

export default BookContainer;
