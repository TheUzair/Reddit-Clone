import { useState, useEffect, useRef } from "react";
import { FaSearch, FaReddit } from "react-icons/fa";
import { useSearch } from "@/hooks/useSearch";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar() {
  const searchRef = useRef(null);
  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isSearching,
    handleSuggestionClick,
  } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <div className="relative flex-1 mx-4" ref={searchRef}>
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Find community or post"
        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-300 
        dark:bg-gray-700 dark:border-gray-600 dark:text-white
        dark:placeholder-gray-400 focus:outline-none focus:ring-2
        focus:ring-[#FF4500] focus:border-transparent"
      />
      <SearchSuggestions
        showSuggestions={showSuggestions}
        isSearching={isSearching}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}