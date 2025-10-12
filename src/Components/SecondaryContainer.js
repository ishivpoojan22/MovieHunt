import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <MovieList
        title={"Now Playing"}
        movies={movies.nowPlayingMovie}
        // posterPath={poster_path}
      />
    </div>
  );
};

export default SecondaryContainer;
