import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovie);

  const mainMovie = movies[0];

  // console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} desc={overview} movieId={id} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
