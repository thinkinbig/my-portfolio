import { NextResponse } from 'next/server';
import axios from 'axios';
import { Concept } from '@/app/(content)/visualizations/knowledge-graph/types';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

async function getConcepts(databaseId: string): Promise<Concept[]> {
  const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`, {}, {
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-05-13',
    },
  });

  const pages = response.data.results as PageObjectResponse[];
  
  return pages.map(page => {
    const properties = page.properties;
    
    // 使用正确的属性名称和类型
    const title = (properties['Term'] as { type: 'title'; title: Array<{ plain_text: string }> })?.title?.[0]?.plain_text || '';
    const description = (properties['Description'] as { type: 'rich_text'; rich_text: Array<{ plain_text: string }> })?.rich_text?.[0]?.plain_text || '';
    const relatedConcepts = (properties['Related Concepts'] as { type: 'relation'; relation: Array<{ id: string }> })?.relation?.map(rel => rel.id) || [];
    const relatedCourseware = (properties['Related Courseware'] as { type: 'relation'; relation: Array<{ id: string }> })?.relation?.map(rel => rel.id) || [];
    const category = (properties['Category'] as { type: 'multi_select'; multi_select: Array<{ name: string }> })?.multi_select?.map(item => item.name)?.join(', ') || '';

    return {
      id: page.id,
      title,
      description,
      category,
      relatedConcepts,
      relatedCourseware,
      url: page.url || '',
      publicUrl: page.public_url || '',
    };
  });
}

export async function GET() {
  try {
    const concepts = await getConcepts(DATABASE_ID);
    return NextResponse.json(concepts);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concepts' },
      { status: 500 }
    );
  }
}
