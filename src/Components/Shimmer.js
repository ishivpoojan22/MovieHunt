const MovieCardShimmer = () => {
  return (
    <div className="w-48 pr-4 animate-pulse">
      <div className="bg-gray-700 rounded-lg h-72 mb-2"></div>
      <div className="bg-gray-600 h-4 rounded mb-1"></div>
      <div className="bg-gray-600 h-3 rounded w-3/4"></div>
    </div>
  );
};

const MovieListShimmer = () => {
  return (
    <div className="px-6 py-4">
      <div className="bg-gray-600 h-6 w-40 rounded mb-4 animate-pulse"></div>
      <div className="flex overflow-x-scroll space-x-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <MovieCardShimmer key={index} />
        ))}
      </div>
    </div>
  );
};

const GptSearchShimmer = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Search results container */}
      <div className="p-4 m-4 bg-black">
        {/* Shimmer for GPT search results title */}
        <div className="bg-gray-600 h-8 w-64 rounded mb-6 animate-pulse mx-auto"></div>

        {/* Multiple movie lists shimmer */}
        {Array.from({ length: 3 }).map((_, listIndex) => (
          <MovieListShimmer key={listIndex} />
        ))}
      </div>
    </div>
  );
};

const SearchBarShimmer = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <div className="w-1/2 bg-black grid grid-cols-12 rounded-lg animate-pulse">
        <div className="m-4 p-4 col-span-9 bg-gray-700 rounded-lg h-12"></div>
        <div className="col-span-3 m-4 py-2 px-4 bg-gray-600 rounded-lg h-12"></div>
      </div>
    </div>
  );
};

// Main shimmer component for different loading states
const Shimmer = ({ type = "search" }) => {
  switch (type) {
    case "search":
      return <GptSearchShimmer />;
    case "searchbar":
      return <SearchBarShimmer />;
    case "movielist":
      return <MovieListShimmer />;
    case "moviecard":
      return <MovieCardShimmer />;
    default:
      return <GptSearchShimmer />;
  }
};

export default Shimmer;
export {
  GptSearchShimmer,
  SearchBarShimmer,
  MovieListShimmer,
  MovieCardShimmer,
};
