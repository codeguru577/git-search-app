import React from "react";
import {
  FaStar,
  FaCodeBranch,
  FaCode,
  FaUserFriends,
  FaMapMarkerAlt,
  FaFileAlt,
  FaFolder,
} from "react-icons/fa";

const UserCard = ({ user }) => {
  return (
    <div className="grid-item">
      <img src={user.avatar_url} alt={user.login} className="git-avatar" />
      <div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          <div className="heading-title">{user.name || "No name provided"}</div>
        </a>
        <div className="repo-stats">
          <div className="stat">
            <a
              href={`https://github.com/orgs/${user.login}/followers`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUserFriends />
              <span>{user.followers} followers </span>
            </a>
          </div>
          •
          <div className="stat">
            <span>{user.following} following </span>
          </div>
          •
          <div className="stat">
            <a
              href={`https://github.com/${user.login}/?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFolder /> <span>{user.public_repos} repositories</span>
            </a>
          </div>
        </div>
        <div>
          <FaMapMarkerAlt /> {user.location || "No location provided"}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
