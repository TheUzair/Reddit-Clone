import { Button } from "@/components/ui/button";

const categories = ["Hot", "New", "Controversial", "Rising", "Top"];

export default function CategoryBar({ activeSubCategory, setActiveSubCategory, loading }) {
  return (
    <div className="flex justify-between items-center mb-6 py-4">
      <h2 className="text-xl font-semibold dark:text-white">Popular</h2>
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={`whitespace-nowrap ${
              activeSubCategory === category
                ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "text-black dark:text-white"
            }`}
            onClick={() => setActiveSubCategory(category)}
            disabled={loading}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}