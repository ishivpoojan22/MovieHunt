import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div>
      <img alt="Movie Poster" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
