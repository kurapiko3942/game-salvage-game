// src/app/api/igdb/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const headers = {
    'Client-ID': process.env.IGDB_CLIENT_ID || '',
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const body = `fields name, screenshots.url, first_release_date, involved_companies.company.name, genres.name, platforms.name; search "${query}";`;

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const data = await response.json();

  console.log('Response data:', JSON.stringify(data, null, 2));

  if (!response.ok) {
    return NextResponse.json({ error: data.message }, { status: response.status });
  }

  return NextResponse.json(data);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  const headers = {
    'Client-ID': process.env.IGDB_CLIENT_ID || '',
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const body = `fields name, screenshots.url, first_release_date, involved_companies.company.name, genres.name, platforms.name; where id = ${id};`;

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const data = await response.json();

  console.log('Response data:', JSON.stringify(data, null, 2));

  if (!response.ok) {
    return NextResponse.json({ error: data.message }, { status: response.status });
  }

  return NextResponse.json(data);
}
