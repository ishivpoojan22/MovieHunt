import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: [],
    nowPopularMovie: [],
    nowTopRatedMovie: [],
    nowUpComingMovie: [],
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.nowPlayingTrailer = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.nowPopularMovie = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.nowTopRatedMovie = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.nowUpComingMovie = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
