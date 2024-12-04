import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feature.css";

function Feature() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const navigate = useNavigate();
  const movieListRef = useRef([]);
  const clickCounts = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlayingResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setNowPlayingMovies(nowPlayingResponse.data.results.slice(0, 4));

      const topRatedResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
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

  const arrowClick = (index) => {
    const listElement = movieListRef.current[index];
    const items = listElement.querySelectorAll(".movie-list-item");
    const itemCount = items.length;
    const ratio = Math.floor(window.innerWidth / 270);

    if (!clickCounts.current[index]) {
      clickCounts.current[index] = 0;
    }

    const maxClicks = itemCount - (4 + clickCounts.current[index]) + (3 - ratio);
    clickCounts.current[index]++;

    if (maxClicks >= 0) {
      const transformValue =
        parseFloat(
          getComputedStyle(listElement).transform.split(",")[4] || 0
        ) - 277;
      listElement.style.transform = `translateX(${transformValue}px)`;
    } else {
      listElement.style.transform = "translateX(0)";
      clickCounts.current[index] = 0;
    }
  };

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

      <div className="movie-list-container">
        <h1 className="movie-list-title">Top Rated</h1>
        <div className="movie-list-wrapper">
          <div
            className="movie-list"
            ref={(el) => (movieListRef.current[0] = el)}
          >
            {topRatedMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-list-item"
                onClick={() => navigate(`/movies/details/${movie.id}`)}
              >
                <img
                  className="movie-list-item-img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <span className="movie-list-item-title">{movie.title}</span>
                <p className="movie-list-item-description">
                  {movie.overview.length > 150
                    ? movie.overview.substring(0, 150) + "..."
                    : movie.overview}
                </p>
                <button className="movie-list-item-button">Watch Now</button>
              </div>
            ))}
          </div>
          <i
            className="fa-solid fa-chevron-right arrow"
            onClick={() => arrowClick(0)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Feature;
