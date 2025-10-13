import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/movieSlice";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const getUpComingMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_OPTIONS
    );
    const json = await data.json();
    console.log("Popular Movies:", json.results);
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
    getUpComingMovieList();
  }, []);
};

export default useUpComingMovies;
