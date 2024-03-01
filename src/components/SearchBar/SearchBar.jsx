import React from "react";
import "./SearchBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ placeholder, filters, setFilters }) {
  const handleInputChange = (event) => {
    const newKeyword = event.target.value;
    setFilters({
      ...filters,
      keyword: newKeyword,
    });
  };

  const clearInput = () => {
    setFilters({
      ...filters,
      keyword: "",
    });
  };

  // return (
  //   <div className="search">
  //     <div className="searchInputs">
  //       <input
  //         type="text"
  //         placeholder={placeholder}
  //         value={filters.keyword || ""}
  //         onChange={handleInputChange}
  //       />
  //       <div className="searchIcon">
  //         {filters.keyword ? (
  //           <FaTimes id="clearBtn" onClick={clearInput} />
  //         ) : (
  //           <FaSearch />
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="search container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={filters.keyword || ""}
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
