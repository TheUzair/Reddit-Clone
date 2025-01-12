import { useState, useEffect } from 'react';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchReddit = async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const authResponse = await fetch('/api/reddit-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!authResponse.ok) {
            throw new Error('Failed to get access token');
          }

          const { access_token } = await authResponse.json();

          const response = await fetch(
            `/api/reddit-search?q=${encodeURIComponent(searchQuery)}`,
            {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (!data || !Array.isArray(data)) {
            throw new Error('Unexpected data structure');
          }

          const transformedResults = data
            .filter(listing => listing.kind === 'Listing' && listing.data?.children)
            .flatMap(listing => listing.data.children)
            .filter(item => item.data)
            .map(item => {
              const isSubreddit = item.kind === 't5';
              return {
                type: isSubreddit ? 'community' : 'post',
                name: isSubreddit ? item.data.display_name_prefixed : item.data.subreddit_name_prefixed,
                members: isSubreddit && item.data.subscribers
                  ? `${(item.data.subscribers).toLocaleString()} members`
                  : '',
                title: !isSubreddit ? item.data.title : '',
                subreddit: !isSubreddit ? item.data.subreddit_name_prefixed : '',
                score: item.data.score,
                id: item.data.id
              };
            })
            .sort((a, b) => {
              if (a.type === 'community' && b.type !== 'community') return -1;
              if (b.type === 'community' && a.type !== 'community') return 1;
              return 0;
            })
            .slice(0, 5);

          setSuggestions(transformedResults);
          setShowSuggestions(transformedResults.length > 0);
        } catch (error) {
          console.error('Error searching Reddit:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(searchReddit, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.type === 'community' ? suggestion.name : suggestion.title);
    setShowSuggestions(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isSearching,
    handleSuggestionClick,
  };
}