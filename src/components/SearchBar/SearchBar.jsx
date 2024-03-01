import React from "react";
import "./SearchBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import debounce from "lodash/debounce";

function SearchBar({ placeholder, filters, setFilters }) {
  const handleInputChange = (event) => {
    const newKeyword = event.target.value;
    debouncedHandleInputChange(newKeyword);
  };

  const debouncedHandleInputChange = debounce((newKeyword) => {
    setFilters({
      ...filters,
      keyword: newKeyword,
    });
  }, 500);

  const clearInput = () => {
    setFilters({
      ...filters,
      keyword: "",
    });
  };

  return (
    <div className="search container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          // value={filters.keyword || ""}
          onChange={handleInputChange}
        />
        <span className="input-group-text">
          {filters.keyword ? (
            <FaTimes id="clearBtn" onClick={clearInput} />
          ) : (
            <FaSearch />
          )}
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
