import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feature.css";

function Feature() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlayingResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setNowPlayingMovies(nowPlayingResponse.data.results.slice(0, 4));

      const moviesData = topRatedResponse.data.results;
      const randomMovies = [];
      let availableMovies = [...moviesData];

      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        randomMovies.push(availableMovies.splice(randomIndex, 1)[0]);
      }

      setTopRatedMovies(randomMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="feature-container">
      { }
      <div className="feature-list-container">
        <div className="titles-container">
          <span className="feature-list-title">Now Playing</span>
          <span
            className="feature-list-more"
            onClick={() => navigate("/movies")}
          >
            See more
          </span>
        </div>
        <div className="feature-list-wrapper">
          <div className="feature-list">
            {nowPlayingMovies.map((movie, index) => (
              <div
                key={index}
                className="feature-list-item"
                onClick={() => navigate(`/movies/details/${movie.id}`)}
              >
                <img
                  className="feature-list-item-img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <span className="feature-list-item-title">{movie.title}</span>
                <p className="feature-list-item-description">
                  {movie.overview.length > 150
                    ? movie.overview.substring(0, 150) + "..."
                    : movie.overview}
                </p>
                <button className="feature-list-item-button">Watch Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
