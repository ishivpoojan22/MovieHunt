const VideoTitle = ({ title, desc, movieId }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-20 absolute bg-gradient-to-r from-black text-white ">
      <h1 className="font-bold text-3xl "> {title}</h1>
      <p className="py-6 text-lg w-1/4"> {desc}</p>
      <div className="flex">
        <div>
          <button className="flex bg-white rounded text-black p-2 px-10 text-lg font-bold hover:bg-gray-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Play_symbol.png?20200414205120"
              className="w-9"
            />
            <div className="pt-1">Play</div>
          </button>
        </div>
        <div className="flex">
          <button className=" bg-gray-500 rounded opacity-50 text-black flex p-3 px-8 mx-4 gap-1 font-bold ">
            <img
              className="w-7"
              src="https://static.thenounproject.com/png/1815789-200.png"
            />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
