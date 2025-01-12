import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, MessageSquare, Share, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import PostSkeleton from "./PostSkeleton";

export default function Post({ post }) {
  // If no post data is provided, return array of skeletons
  if (!post) {
    return <PostSkeleton />;
  }

  // Render actual post content when post data is available
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr,1fr,auto] md:gap-8">
        {/* Main Content */}
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 relative w-20 h-20 sm:w-16 sm:h-16">
              <div className="relative w-full h-full">
                <Image
                  src={post.image || "/default-image.jpg"}
                  alt={post.title}
                  fill
                  className="rounded-md object-cover"
                  sizes="80px"
                  unoptimized
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posted by {post.author} - {post.date}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center md:flex-col md:items-start md:border-r border-gray-200 dark:border-gray-700 md:px-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <span className="text-gray-900 dark:text-white">{post.comments}</span>
              <span className="text-gray-500 dark:text-gray-400">Comments</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <span className="text-gray-900 dark:text-white">{post.shares}</span>
              <span className="text-gray-500 dark:text-gray-400">Shares</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-fit p-0 flex items-center gap-2">
            <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">More</span>
          </Button>
        </div>

        {/* Voting Section */}
        <div className="flex md:flex-col items-center justify-end gap-2 md:px-4">
          <Button variant="outline" size="sm" className="p-1">
            <ChevronUp className="w-4 h-4 text-green-500" />
          </Button>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {post.votes}
          </p>
          <Button variant="outline" size="sm" className="p-1">
            <ChevronDown className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}