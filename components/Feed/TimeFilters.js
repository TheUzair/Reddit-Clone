import { Button } from "@/components/ui/button";

const timeFilters = ["hour", "day", "week", "month", "year", "all"];

export default function TimeFilters({ timeFilter, setTimeFilter, loading }) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      {timeFilters.map((time) => (
        <Button
          key={time}
          variant="ghost"
          size="sm"
          className={`whitespace-nowrap ${
            timeFilter === time
              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setTimeFilter(time)}
          disabled={loading}
        >
          {time.charAt(0).toUpperCase() + time.slice(1)}
        </Button>
      ))}
    </div>
  );
}