import React from "react";
import { Outlet } from "react-router-dom";
import Genres from "../components/Genres";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import './MoviesView.css';

function MoviesView() {
  const genres = [
    { genre: "Action", id: 28 },
    { genre: "Adventure", id: 12 },
    { genre: "Comedy", id: 35 },
    { genre: "TV", id: 10770 },
    { genre: "Horror", id: 27 },
    { genre: "War", id: 10752 },
    { genre: "Science Fiction", id: 878 },
    { genre: "Thriller", id: 53 },
    { genre: "Fantasy", id: 14 },
    { genre: "Animation", id: 16 },
  ];

  return (
    <div>
      <div className="movies-view-container">
        <Header />
        <div className="main-content">
          <aside className="genre-view">
            <Genres genres={genres} />
          </aside>
          <main className="detail-view">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MoviesView;
