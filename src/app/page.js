"use client";
import MovieBoard from "@/components/MovieBoard";
import Search from "@/components/ui/Search";
import {
  getMovies,
  moveMovie,
  addMovie,
  updateMovie
} from "@/features/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import AddMovie from "@/components/AddEditModel";

import { uuidv4 } from "@/utils/index";
export default function Home() {
  const [isAddModel, setAddModel] = useState(false);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Drop occurred outside a droppable area
    if (
      source?.droppableId === destination?.droppableId &&
      source.index === destination.index
    )
      return; // No position change

    // Dispatch the updateMovie action with source and destination information
    dispatch(moveMovie({ source, destination }));
  };
  const onAddMovie = (payload) => {
    const newMovie = { ...payload, id: uuidv4() };
    dispatch(addMovie(newMovie));
  };
  const onUpdateMovie = (payload) => {
    dispatch(updateMovie(payload));
  };

  // Memoize filteredData to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!search) return movies;
    return movies.map((list) => ({
      ...list,
      items: list.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    }));
  }, [search, movies]);

  useEffect(() => {
    if (!movies?.length) {
      fetch("/api/movies")
        .then((res) => res.json())
        .then((data) => {
          dispatch(getMovies(data));
        });
    }
  }, []);
  return (
    <main className="mx-auto max-w-7xl p-12 lg:p-24 lg:pt-8 ">
      <div className="flex items-center space-x-4 sm:space-x-8 justify-end w-full">
        <div className="flex w-2/3 sm:w-7/12">
          <Search
          
            setSearch={setSearch}
          
          />
        </div>
        <div className="max-w-sm">
          <button
            onClick={(e) => setAddModel(true)}
            type="button"
            className="bg-purple-500 w-full  h-11  text-base font-semibold px-4  sm:px-14 py-2 text-white rounded-full">
            Add New
          </button>
        </div>
      </div>

      <MovieBoard
        updateMovie={onUpdateMovie}
        onDragEnd={onDragEnd}
        data={filteredData}
        withScrollableColumns
      />

      <AddMovie
        onForm={onAddMovie}
        isOpen={isAddModel}
        onClose={(e) => setAddModel(false)}
      />
    </main>
  );
}
