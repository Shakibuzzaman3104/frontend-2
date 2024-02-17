
import { useState } from "react";
import useDebounce from '@/hooks/useDebounce'
const Search = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = useDebounce((query) => {
    // Perform search operation with the debounced term
    setSearch(query);
  }, 500);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    // Debounce the search callback
    handleSearch(value);
  };
  let onClickSearch = () => {
    if (query) setSearch(query);
  };
  return (
    <div className="flex flex-row gap-3 w-full">
      <input
        type="text"
        placeholder="Type here..."
        onChange={handleChange}
        value={query}
        className="bg-white px-4 py-3 rounded-md h-11 w-full sm:w-10/12 focus:border-none focus:outline-none outline-none text-black"
      />
      <button
        className="bg-white sm:px-6 px-2 h-11 rounded-md  w-24 lg:w-2/12 text-black"
        onClick={onClickSearch}
        type="button">
        Search
      </button>
    </div>
  );
};

export default Search;
