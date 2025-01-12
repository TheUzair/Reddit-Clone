import { FaReddit } from "react-icons/fa";

export default function SearchSuggestions({
  showSuggestions,
  isSearching,
  suggestions,
  onSuggestionClick,
}) {
  if (!showSuggestions) return null;

  return (
    <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 
      dark:border-gray-700 rounded-md shadow-lg z-50">
      {isSearching ? (
        <div className="p-3 text-center text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.id}-${index}`}
            onClick={() => onSuggestionClick(suggestion)}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            {suggestion.type === 'community' ? (
              <div className="flex items-center">
                <FaReddit className="w-5 h-5 text-[#FF4500] mr-2" />
                <div>
                  <div className="font-medium dark:text-white">{suggestion.name}</div>
                  <div className="text-sm text-gray-500">{suggestion.members}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="font-medium dark:text-white">{suggestion.title}</div>
                <div className="text-sm text-gray-500">{suggestion.subreddit}</div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="p-3 text-center text-gray-500 dark:text-gray-400">
          No results found
        </div>
      )}
    </div>
  );
}