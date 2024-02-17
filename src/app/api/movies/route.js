import moviesData from './movies.json';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Input validation
    if (!isValidRequest(request)) {
      return NextResponse.error('Bad Request', { status: 400 });
    }

    // Fetch movies data
    const movies = await fetchMovies();

    // Return response
    return NextResponse.json(movies);
  } catch (error) {
    // Handle errors
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Function to fetch movies data
async function fetchMovies() {
  return moviesData;
}

// Function to validate request
function isValidRequest(request) {
  // Here you can add your validation logic
  // For example, check if the request is valid
  return true; // Placeholder for demonstration
}