import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const time = searchParams.get('time');
  const accessToken = searchParams.get('accessToken');
  const limit = searchParams.get('limit') || '25'; // Default to 25 posts

  try {
    let endpoint = category.toLowerCase();
    const queryParams = new URLSearchParams();

    if (endpoint === 'top' || endpoint === 'controversial') {
      queryParams.set('t', time);
    }
    queryParams.set('limit', limit);

    const url = `https://oauth.reddit.com/r/popular/${endpoint}?${queryParams.toString()}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Handle rate limiting
    if (response.status === 429) {
      const resetTime = response.headers.get('X-Ratelimit-Reset');
      const retryAfter = response.headers.get('Retry-After');

      return NextResponse.json(
        {
          message: 'Rate limit exceeded',
          resetTime,
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter
          }
        }
      );
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Reddit data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch Reddit data' },
      { status: 500 }
    );
  }
}