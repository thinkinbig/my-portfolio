export interface Concept {
  id: string;
  title: string;
  category: string;
  relatedCourseware: string[];
  relatedConcepts: string[];
  description?: string;
  roles?: string[];
  url: string;  // Notion 内部 URL
  publicUrl: string;  // 公开访问 URL
}

export type NotionResponse = {
  results: Array<{
    id: string;
    properties: {
      Term: { type: 'title'; title: Array<{ plain_text: string }> };
      Description: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> };
      Category: { type: 'multi_select'; multi_select: Array<{ name: string }> };
      'Related Concepts': { type: 'relation'; relation: Array<{ id: string }> };
      'Related Courseware': { type: 'relation'; relation: Array<{ id: string }> };
    };
    url: string;
    public_url: string;
  }>;
}; 