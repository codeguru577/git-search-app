import React from "react";
import {
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
  FaFileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import moment from "moment";

const RepositoryCard = ({ repo }) => {
  return (
    <div className="grid-item">
      <div>
        <div className="git-repo-name">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
          <span className="git-repo-visibility">
            {repo.visibility
              ? repo.visibility.charAt(0).toUpperCase() +
                repo.visibility.slice(1)
              : "N/A"}
          </span>
        </div>
        <div className="git-repo-description">
          {repo.description || "No description provided"}
        </div>
        <div className="repo-stats">
          <div className="stat">
            <a
              href={`https://github.com/${
                repo.owner ? repo.owner.login : "N/A"
              }/${repo.name}/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaStar />
              <span>{repo.stargazers_count} Stars</span>
            </a>
          </div>
          •
          <div className="stat">
            <a
              href={`https://github.com/${
                repo.owner ? repo.owner.login : "N/A"
              }/${repo.name}/network/members`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaCodeBranch /> <span>{repo.forks_count} Forks</span>
            </a>
          </div>
          •
          <div className="stat">
            <a
              href={`https://github.com/${
                repo.owner ? repo.owner.login : "N/A"
              }/${repo.name}/issues`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExclamationCircle />{" "}
              <span>{repo.open_issues_count} Issues</span>
            </a>
          </div>
          •
          <div className="stat">
            {repo.language && <FaFileAlt />} <span>{repo.language}</span>
          </div>
          •
          <div className="stat">
            <FaMapMarkerAlt />{" "}
            <span>Updated {moment(repo.updated_at).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
