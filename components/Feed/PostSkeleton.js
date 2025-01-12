export default function PostSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 mb-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr,1fr,auto] md:gap-8">
            {/* Main Content Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                {/* Image Skeleton */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                
                {/* Title and Author Info Skeleton */}
                <div className="space-y-3 flex-1">
                  <div className="space-y-2.5 animate-pulse">
                    {/* Title */}
                    <div className="flex items-center w-full">
                      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                    </div>
                    {/* Author and date */}
                    <div className="flex items-center w-2/3">
                      <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section Skeleton */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center md:flex-col md:items-start md:border-r border-gray-200 dark:border-gray-700 md:px-8">
              {/* Comments */}
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>

              {/* Shares */}
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>

              {/* More Button */}
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-3 w-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>

            {/* Voting Section Skeleton */}
            <div className="flex md:flex-col items-center justify-end gap-2 md:px-4">
              <div className="animate-pulse space-y-2">
                {/* Up vote button */}
                <div className="h-8 w-8 bg-gray-200 rounded dark:bg-gray-700"></div>
                {/* Vote count */}
                <div className="h-4 w-8 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
                {/* Down vote button */}
                <div className="h-8 w-8 bg-gray-200 rounded dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}