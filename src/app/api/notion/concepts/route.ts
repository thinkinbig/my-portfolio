import { NextResponse } from 'next/server';
import { getConcepts } from '@/lib/notion';

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    return NextResponse.json(
      { error: 'NOTION_DATABASE_ID is not set' },
      { status: 500 }
    );
  }

  try {
    const concepts = await getConcepts(databaseId);
    return NextResponse.json(concepts);
  } catch (error) {
    console.error('Failed to fetch concepts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concepts' },
      { status: 500 }
    );
  }
}
