import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: []
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovies: (state, action) => {
      state.movies = action.payload;
    },
    moveMovie: (state, action) => {
      const { source, destination } = action.payload;
      const sourceDroppableIndex = Number(
        source.droppableId.split("droppable")[1]
      );
      const destinationDroppableIndex = Number(
        destination.droppableId.split("droppable")[1]
      );

      if (source.droppableId === destination.droppableId) {
        const items = state.movies[sourceDroppableIndex].items;
        const [removedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, removedItem);
      } else {
        const [removedItem] = state.movies[sourceDroppableIndex].items.splice(
          source.index,
          1
        );
        state.movies[destinationDroppableIndex].items.splice(
          destination.index,
          0,
          removedItem
        );
      }
    },
    updateMovie: (state, action) => {
      const { id, name, review, index } = action.payload;
      return {
        ...state,
        movies: state.movies.map((movie, movieIndex) => {
          if (movieIndex === index) {
            return {
              ...movie,
              items: movie.items.map(item =>
                item.id === id ? { ...item, name, review } : item
              )
            };
          } else {
            return movie;
          }
        })
      };
    },
    addMovie: (state, action) => {
      return {
        ...state,
        movies: [
          {
            ...state.movies[0],
            items: [...state.movies[0].items, action.payload]
          },
          ...state.movies.slice(1) // If there are other movies you want to keep
        ]
      };
    }
  }
});

export const { getMovies, updateMovie, addMovie, moveMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
