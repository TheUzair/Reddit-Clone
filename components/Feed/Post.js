import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, MessageSquare, Share, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function Post({ post, loading }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] md:gap-8">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 relative w-20 h-20">
              {loading ? (
                <div className="w-20 h-20 bg-gray-200 rounded-md animate-pulse" />
              ) : (
                <div className="relative w-20 h-20">
                  {post.image.startsWith('http') ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="rounded-md object-cover"
                      onError={() => {
                        const img = document.getElementById(`img-${post.id}`);
                        if (img) img.src = '/default-image.jpg';
                      }}
                      sizes="80px"
                      unoptimized
                      id={`img-${post.id}`}
                    />
                  ) : (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="rounded-md object-cover"
                      sizes="80px"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="mb-8 text-lg font-semibold text-gray-800 dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posted by {post.author} - {post.date}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:border-r border-gray-200 dark:border-gray-700 md:px-8">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white">{post.comments}</span>
            <span className="text-gray-500 dark:text-gray-400">Comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white">{post.shares}</span>
            <span className="text-gray-500 dark:text-gray-400">Shares</span>
          </div>
          <Button variant="ghost" size="sm" className="w-fit p-0">
            <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">More</span>
          </Button>
        </div>

        <div className="flex md:flex-col items-center gap-2 justify-end md:px-4">
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