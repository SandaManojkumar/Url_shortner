import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/shorten", {
      original: url,
    });
    setShortUrl(`http://localhost:5000/${response.data.short}`);
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h2>🔗 URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL"
          />
          <br />
          <button type="submit">Shorten URL</button>
        </form>
        {shortUrl && (
          <p>
            Shortened URL: <a href={shortUrl}>{shortUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
