import { useDispatch, useSelector } from "react-redux";
import lan from "../utils/languageConstant";
import { useRef, useState } from "react";
import ai from "../utils/genai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
import SearchLoadingShimmer from "./SearchLoadingShimmer";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lan);
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Function to search for a single movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // GPT Movie Search
  const handleGptSearchClick = async () => {
    setErrorMessage(""); // clear old error message
    setIsLoading(true); // Start loading
    const query = searchText.current.value.trim();

    if (!query) {
      setErrorMessage("⚠️ Please enter a movie topic before searching!");
      setIsLoading(false);
      return;
    }

    // Prompt to send to Gemini API
    const gptquery =
      "Act as a Movie Recommendation System and suggest some movies for the query: " +
      query +
      ". Only give me names of 7 movies, comma separated like this example: KGF, KGF2, Dhol, Don, Sholay.";

    try {
      const gptResults = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: gptquery,
      });

      if (!gptResults?.text) {
        setErrorMessage(
          "🤖 Oops! I couldn't generate any movie suggestions right now. Please try again in a few seconds."
        );
        setIsLoading(false);
        return;
      }

      // Convert GPT response into an array of movie names
      const gptMovies = gptResults.text
        .split(",")
        .map((movie) => movie.trim())
        .filter((m) => m.length > 0);

      if (!gptMovies || gptMovies.length === 0) {
        setErrorMessage("🤖 No valid movie names were returned by GPT.");
        setIsLoading(false);
        return;
      }

      console.log("GPT Movies:", gptMovies);

      // Fetch movie details from TMDB for each recommendation
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
      setIsLoading(false); // End loading
    } catch (error) {
      console.error("Error while fetching GPT results:", error);
      setErrorMessage(
        "🚨 Something went wrong while fetching recommendations. Please try again later."
      );
      setIsLoading(false); // End loading on error
    }
  };

  return (
    <div className="pt-[10%] flex flex-col items-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="m-4 p-4 col-span-9 rounded-lg text-black"
          placeholder={lan[langKey].gptSearchPlaceHolder}
          disabled={isLoading}
        />
        <button
          className={`col-span-3 m-4 py-2 px-4 rounded-lg transition ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-800 hover:bg-red-700"
          } text-white`}
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            lan[langKey].search
          )}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 text-red-500 font-medium bg-red-100 px-4 py-2 rounded-lg shadow-sm animate-pulse">
          {errorMessage}
        </div>
      )}

      {/* Show shimmer when loading */}
      {isLoading && (
        <div className="w-full mt-8">
          <SearchLoadingShimmer />
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
