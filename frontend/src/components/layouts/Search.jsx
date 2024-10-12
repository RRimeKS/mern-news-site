import React, { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const ref = useClickOutside(() => setShowSearch(false));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!showSearch) setShowSearch(true);
    if (showSearch && keyword.trim()) {
      navigate(`/arama?aranan=${keyword}`);
      setKeyword("");
      setShowSearch(false);
    }
  };

  return (
    <form className="" ref={ref}>
      <label
        className={`relative bg-white p-2  ${
          !showSearch ? "rounded-xl" : "rounded-se-xl rounded-ee-xl"
        } flex `}
      >
        <input
          type="text"
          name="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={`search-bar absolute bottom-0 right-0 h-full ps-3 ${
            showSearch ? "search-bar-show" : "search-bar-close"
          } `}
        />
        <button onClick={onSubmitHandler} className="z-30 bg-white">
          <i class="ri-search-2-line text-black text-xl border-none "></i>
        </button>
      </label>
    </form>
  );
};

export default Search;
