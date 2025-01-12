import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const authHeader = request.headers.get('authorization');
  
  if (!query || !authHeader) {
    return NextResponse.json(
      { message: 'Missing query or authorization' },
      { status: 400 }
    );
  }

  try {
    const searchUrl = `https://oauth.reddit.com/search?q=${encodeURIComponent(query)}&type=sr,link&limit=10&sort=relevance&include_over_18=false`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Failed to search Reddit' },
      { status: 500 }
    );
  }
}