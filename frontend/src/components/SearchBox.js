import React from "react";

const SearchBox = ({
  searchText,
  searchType,
  handleInputChange,
  handleSelectChange,
  status,
}) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-edit"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
      />
      <select
        className="search-dropdown"
        value={searchType}
        onChange={handleSelectChange}
      >
        <option value="user">User</option>
        <option value="repository">Repository</option>
      </select>
      <div>{status}</div>
    </div>
  );
};

export default SearchBox;
