import { Button } from "@/components/ui/button";

export default function LoadMoreButton({ onClick, loading }) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full mt-4 transition-colors duration-200 
        bg-white dark:bg-gray-800 
        hover:bg-gray-100 dark:hover:bg-gray-700
        text-gray-800 dark:text-gray-200
        border border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span>Load More</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}
    </Button>
  );
}