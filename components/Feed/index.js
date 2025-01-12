"use client";

import { useState, useEffect } from "react";
import CategoryBar from "./CategoryBar";
import TimeFilters from "./TimeFilters";
import PostList from "./PostList";
import { getRedditAccessToken, transformRedditData } from "@/lib/reddit";

export default function Feed() {
  const [activeSubCategory, setActiveSubCategory] = useState("Hot");
  const [loading, setLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState("day");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  const POSTS_PER_PAGE = 10;

  const fetchRedditData = async (category, time = "day") => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = await getRedditAccessToken();

      if (!accessToken) {
        setError("Authentication failed. Please try again.");
        return;
      }

      const url = `/api/reddit-data?category=${category}&time=${time}&accessToken=${accessToken}&limit=100`;
      const response = await fetch(url);

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After") || "60";
        setError("Rate limit reached. Retrying...");
        setTimeout(() => {
          fetchRedditData(category, time);
        }, parseInt(retryAfter) * 1000);
        return;
      }

      if (response.status === 401 || response.status === 403) {
        setError("Authentication expired. Please refresh the page.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error: ${response.status} - ${errorData.message || "Failed to fetch data"}`
        );
      }

      const data = await response.json();
      if (!data?.data?.children) {
        throw new Error("Invalid data format received");
      }

      const transformedPosts = transformRedditData(data);
      setAllPosts(transformedPosts);
      setDisplayedPosts(transformedPosts.slice(0, POSTS_PER_PAGE));
      setPage(1);
    } catch (error) {
      console.error("Error fetching Reddit data:", error);
      setAllPosts([]);
      setDisplayedPosts([]);
      setError(
        error.message || "Failed to load posts. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    setDisplayedPosts((prevPosts) => [
      ...prevPosts,
      ...allPosts.slice(startIndex, endIndex),
    ]);
    setPage(nextPage);
  };

  useEffect(() => {
    fetchRedditData(activeSubCategory, timeFilter);
  }, [activeSubCategory, timeFilter]);

  const hasMore = displayedPosts.length < allPosts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-2 md:px-4 py-4 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* CategoryBar */}
      <div className="mb-4">
        <CategoryBar
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
          loading={loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-4">
          {error}
        </div>
      )}

      {/* Time Filters */}
      {(activeSubCategory === "Top" || activeSubCategory === "Controversial") && (
        <div className="mb-4">
          <TimeFilters
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            loading={loading}
          />
        </div>
      )}

      {/* Post List */}
      <PostList
        loading={loading}
        displayedPosts={displayedPosts}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </div>
  );
}
