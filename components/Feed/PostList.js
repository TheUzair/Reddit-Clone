import Post from "./Post";
import LoadMoreButton from "./LoadMoreButton";

export default function PostList({ loading, displayedPosts, hasMore, loadMore }) {
  if (loading && displayedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} loading={loading} />
      ))}

      {hasMore && !loading && displayedPosts.length > 0 && (
        <LoadMoreButton onClick={loadMore} loading={loading} />
      )}

      {!hasMore && displayedPosts.length > 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No more posts to load
        </div>
      )}
    </div>
  );
}