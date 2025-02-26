import React, { useState } from "react";
import { postData } from "./APIService";
import {
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
  FaGitPullRequest,
  FaFileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import icons from react-icons
import moment from "moment";
import "./App.css";

// import Nav from "./components/Nav";

const App = () => {
  const [searchType, setSearchType] = useState("user");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const [githubData, setGithubData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // Clear previous timeout (if any)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout for debouncing
    const newTimeout = setTimeout(() => {
      fetchGithub(searchType, value); // Send POST request after typing has stopped
    }, 1000); // 1000ms (1 second) debounce time

    setTypingTimeout(newTimeout); // Store the timeout ID
  };
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSearchType(value);

    // Clear previous timeout (if any)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout for debouncing
    const newTimeout = setTimeout(() => {
      fetchGithub(value, searchText); // Send POST request after typing has stopped
    }, 1000); // 1000ms (1 second) debounce time

    setTypingTimeout(newTimeout); // Store the timeout ID
  };
  const fetchGithub = async (type, text) => {
    try {
      setStatus("Sending..."); // Update the status to "Sending..."

      // Send the POST request with the input value
      console.log(type, text);
      const result = await postData("/api/search/", {
        search_type: type,
        search_text: text,
      }); // Your endpoint here
      setStatus("Data sent successfully!"); // Update status on success
      console.log("Server response:", result);
      setGithubData(result.hasOwnProperty("items") ? result["items"] : []);
      console.log(result.hasOwnProperty("items") ? result["items"] : []);
    } catch (error) {
      setStatus(`Error: ${error.message}`); // Update status on error
    }
  };
  return (
    <div>
      <div className="heading">
        <svg
          height="32"
          aria-hidden="true"
          viewBox="0 0 24 24"
          version="1.1"
          width="32"
          data-view-component="true"
          className="heading-icon"
        >
          <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
        </svg>
        <div>
          <div className="heading-title">GitHub Searcher</div>
          <div className="heading-description">
            Search users or repositories below
          </div>
        </div>
      </div>

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
          <option value="user">Users</option>
          <option value="repository">Repos</option>
        </select>
      </div>
      <div className="card-container">
        {githubData.map((item, index) => (
          <div key={index} className="grid-item">
            {searchType === "user" ? (
              <>
                <img
                  src={item.avatar_url}
                  alt={item.login}
                  className="git-avatar"
                />
                <div>
                  <a href={item.html_url} target="_blank">
                    <div className="heading-title">{item.login}</div>
                  </a>
                  <div>{item.location || "No location provided"}</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="git-repo-name">
                    <a href={item.html_url} target="_blank">
                      {item.name}
                    </a>
                    <span className="git-repo-visibility">
                      {item.visibility
                        ? item.visibility.charAt(0).toUpperCase() +
                          item.visibility.slice(1)
                        : "N/A"}
                    </span>
                  </div>
                  <div>{item.description || "No description provided"}</div>
                  <div className="repo-stats">
                    <div className="stat">
                      <a
                        href={`https://github.com/${
                          item.owner ? item.owner.login : "N/A"
                        }/${item.name}/stargazers`}
                        target="_blank"
                      >
                        <FaStar />
                        <span>{item.stargazers_count} Stars</span>
                      </a>{" "}
                    </div>
                    •
                    <div className="stat">
                      <a
                        href={`https://github.com/${
                          item.owner ? item.owner.login : "N/A"
                        }/${item.name}/network/members`}
                        target="_blank"
                      >
                        <FaCodeBranch /> <span>{item.forks_count} Forks</span>
                      </a>
                    </div>
                    •
                    <div className="stat">
                      <a
                        href={`https://github.com/${
                          item.owner ? item.owner.login : "N/A"
                        }/${item.name}/issues`}
                        target="_blank"
                      >
                        <FaExclamationCircle />{" "}
                        <span>{item.open_issues_count} Issues</span>
                      </a>
                    </div>
                    •
                    <div className="stat">
                      {item.language && <FaFileAlt />}{" "}
                      <span>{item.language}</span>
                    </div>
                    •
                    <div className="stat">
                      <FaMapMarkerAlt />{" "}
                      <span>Updated {moment(item.updated_at).fromNow()}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
