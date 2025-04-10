import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

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
    const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      page_size: parseInt(pageSize || '100'),
      sorts: [
        {
          timestamp: sortBy || 'created_time',
          direction: sortDirection || 'descending',
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13',
      },
    });

    return NextResponse.json({
      success: true,
      data: response.data,
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