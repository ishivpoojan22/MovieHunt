import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=" text-white bg-black">
      <div className="-mt-64 pl-12 z-10 relative">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovie} />
        <MovieList title={"Top Rated"} movies={movies.nowTopRatedMovie} />
        <MovieList title={"Popular Movies"} movies={movies.nowPopularMovie} />
        <MovieList title={"Up Coming"} movies={movies.nowUpComingMovie} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
