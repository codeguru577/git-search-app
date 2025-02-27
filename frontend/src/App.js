import React, { useState } from "react";
import { postData } from "./APIService";
import _ from "lodash";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import UserCard from "./components/UserCard";
import RepositoryCard from "./components/RepositoryCard";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [searchType, setSearchType] = useState("user");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(
    "Please enter a search term of 3 or more characters"
  );
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [githubData, setGithubData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(12);

  const fetchGithub = async (type, text, page) => {
    if (text.length < 3) {
      setStatus("Please enter a search term of 3 or more characters");
      return;
    }

    try {
      const result = await postData("/api/search/", {
        search_type: type,
        search_text: text,
        page: page,
        per_page: perPage,
      });
      setStatus("Loaded successfully!");
      setGithubData(result.hasOwnProperty("items") ? result["items"] : []);
      console.log(result.hasOwnProperty("items") ? result["items"] : []);
      setTotalCount(result.total_count);
    } catch (error) {
      setGithubData([]);
      setTotalCount(0);
      setStatus(`${error.message}`);
    }
  };

  const debouncedFetchGithub = _.debounce(fetchGithub, 500);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchText(value);
    setStatus("Loading data...");
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      debouncedFetchGithub(searchType, value, 1);
      setCurrentPage(0);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;

    setSearchType(value);
    setStatus("Loading data...");
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      debouncedFetchGithub(value, searchText, 1);
      setCurrentPage(0);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setStatus("Loading data...");
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      debouncedFetchGithub(searchType, searchText, selected + 1);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  return (
    <div>
      <div
        className={
          githubData.length > 0 ? "search-box-top" : "search-box-center"
        }
      >
        <Header />
        <SearchBox
          searchText={searchText}
          searchType={searchType}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          status={status}
        />
      </div>
      <div className="card-container">
        {githubData.map((item, index) =>
          searchType === "user" ? (
            <UserCard key={index} user={item} />
          ) : (
            <RepositoryCard key={index} repo={item} />
          )
        )}
      </div>
      {githubData.length > 0 && (
        <Pagination
          pageCount={Math.ceil(totalCount / perPage)}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default App;
