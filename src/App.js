import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState(null);

  const handleSearch = async () => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();
      setUserData(userData);

      const repositoriesResponse = await fetch(userData.repos_url);
      const repositoriesData = await repositoriesResponse.json();
      setRepositories(repositoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Profile Viewer</h1>
      <div className="search">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a GitHub username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt="Profile" />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repositories: {userData.public_repos}</p>
        </div>
      )}

      {repositories && (
        <div className="repositories">
          <h2>Repositories</h2>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
