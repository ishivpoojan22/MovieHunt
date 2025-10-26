import { BG_URL } from "../utils/constant";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
 

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="" src={BG_URL} alt="bg-image" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
