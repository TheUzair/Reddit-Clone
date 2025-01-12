export const transformRedditData = (apiData) => {
  return apiData.data.children.map((post) => {
    let imageUrl = '/default-image.jpg';

    if (post.data.thumbnail) {
      if (post.data.thumbnail.startsWith('http') && !['self', 'default', 'nsfw', 'spoiler'].includes(post.data.thumbnail)) {
        try {
          imageUrl = decodeURIComponent(post.data.thumbnail).split('&amp;').join('&');
        } catch {
          imageUrl = '/default-image.jpg';
        }
      } else if (post.data.preview?.images?.[0]?.source?.url) {
        try {
          imageUrl = decodeURIComponent(post.data.preview.images[0].source.url).split('&amp;').join('&');
        } catch {
          imageUrl = '/default-image.jpg';
        }
      }
    }

    return {
      id: `${post.data.id}-${crypto.randomUUID()}`,
      originalId: post.data.id,
      title: post.data.title,
      author: post.data.author,
      date: new Date(post.data.created_utc * 1000).toLocaleString(),
      comments: post.data.num_comments,
      shares: post.data.num_crossposts,
      votes: formatVotes(post.data.score),
      image: imageUrl,
    };
  });
};

export const formatVotes = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

export const getRedditAccessToken = async () => {
  try {
    const response = await fetch('/api/reddit-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Auth Error: ${response.status} - ${errorData.message || 'Failed to get access token'}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token received');
    }
    return data.access_token;
  } catch (error) {
    console.error('Error getting Reddit access token:', error);
    throw error;
  }
};