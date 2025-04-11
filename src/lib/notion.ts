import { Concept, NotionResponse } from '@/types/notion';

// V1 API
async function getConceptsV1(databaseId: string): Promise<Concept[]> {
  if (!process.env.NOTION_TOKEN_V1) {
    throw new Error('NOTION_TOKEN_V1 is not set');
  }

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN_V1}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-05-13'
    }
  });

  if (!response.ok) throw new Error('V1 API failed');
  
  const data: NotionResponse = await response.json();
  return data.results.map(result => ({
    id: result.id,
    title: result.properties.Term.title[0].plain_text,
    description: result.properties.Description.rich_text[0]?.plain_text,
    category: result.properties.Category.multi_select.map(item => item.name).join(', '),
    relatedConcepts: result.properties['Related Concepts'].relation.map(rel => rel.id),
    relatedCourseware: result.properties['Related Courseware'].relation.map(rel => rel.id),
    url: result.url,
    publicUrl: result.public_url
  }));
}

// V2 API
async function getConceptsV2(databaseId: string): Promise<Concept[]> {
  if (!process.env.NOTION_TOKEN_V2) {
    throw new Error('NOTION_TOKEN_V2 is not set');
  }

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN_V2}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    }
  });

  if (!response.ok) throw new Error('V2 API failed');
  
  const data: NotionResponse = await response.json();
  return data.results.map(result => ({
    id: result.id,
    title: result.properties.Term.title[0].plain_text,
    description: result.properties.Description.rich_text[0]?.plain_text,
    category: result.properties.Category.multi_select.map(item => item.name).join(', '),
    relatedConcepts: result.properties['Related Concepts'].relation.map(rel => rel.id),
    relatedCourseware: result.properties['Related Courseware'].relation.map(rel => rel.id),
    url: result.url,
    publicUrl: result.public_url
  }));
}

// 简单的防腐层策略， 先使用 V2 API，如果失败，再使用 V1 API
export async function getConcepts(databaseId: string): Promise<Concept[]> {
  try {
    // 优先使用 V2
    return await getConceptsV2(databaseId);
  } catch (error) {
    console.warn('V2 API failed, falling back to V1');
    return getConceptsV1(databaseId);
  }
} 