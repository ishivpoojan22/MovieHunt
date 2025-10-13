import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovie);
  if (!movies.length) return "wait"; 

  const mainMovie = movies[11];

  console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} desc={overview} movieId={id} /> 
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
