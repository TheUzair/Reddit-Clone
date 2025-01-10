import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const time = searchParams.get('time');
  const accessToken = searchParams.get('accessToken');

  try {
    let endpoint = category.toLowerCase();
    if (endpoint === 'top' || endpoint === 'controversial') {
      endpoint += `?t=${time}`;
    }

    const response = await fetch(`https://oauth.reddit.com/r/popular/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

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