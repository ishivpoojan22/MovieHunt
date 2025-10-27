import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

const SearchLoadingShimmer = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Loading title */}
      <div className="text-center mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-600 rounded-lg w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
        </div>
      </div>

      {/* Movie suggestions loading */}
      <div className="space-y-8">
        {/* First movie list */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-48 mb-4"></div>
          <div className="flex overflow-hidden space-x-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-none w-48">
                <div className="bg-gray-700 rounded-lg h-72 mb-2"></div>
                <div className="bg-gray-600 h-4 rounded mb-1"></div>
                <div className="bg-gray-600 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Second movie list */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-56 mb-4"></div>
          <div className="flex overflow-hidden space-x-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-none w-48">
                <div className="bg-gray-700 rounded-lg h-72 mb-2"></div>
                <div className="bg-gray-600 h-4 rounded mb-1"></div>
                <div className="bg-gray-600 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Third movie list */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-52 mb-4"></div>
          <div className="flex overflow-hidden space-x-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-none w-48">
                <div className="bg-gray-700 rounded-lg h-72 mb-2"></div>
                <div className="bg-gray-600 h-4 rounded mb-1"></div>
                <div className="bg-gray-600 h-3 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading animation with text */}
      <div className="flex flex-col items-center justify-center mt-12 mb-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-r-4 border-red-600 mb-4"></div>
        <div className="text-white text-lg font-medium animate-pulse">
          🎬 Finding perfect movies for you...
        </div>
        <div className="text-gray-400 text-sm mt-2 animate-pulse">
          This may take a few seconds
        </div>
      </div>
    </div>
  );
};

export default SearchLoadingShimmer;
