import { NextRequest, NextResponse } from 'next/server';
import { queryDatabase } from './notion-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const databaseId = searchParams.get('databaseId');
  const pageSize = searchParams.get('pageSize');
  const sortBy = searchParams.get('sortBy') as 'created_time' | 'last_edited_time' | null;
  const sortDirection = searchParams.get('sortDirection') as 'ascending' | 'descending' | null;

  if (!databaseId) {
    return NextResponse.json(
      { success: false, error: 'Database ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await queryDatabase(databaseId, {
      pageSize: parseInt(pageSize || '100'),
      sorts: [
        {
          timestamp: sortBy || 'created_time',
          direction: sortDirection || 'descending',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error fetching database:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch database',
      },
      { status: 500 }
    );
  }
} 