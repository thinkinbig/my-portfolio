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

export interface GraphNode {
  id: string;
  concept: Concept;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export type ViewType = 'category' | 'courseware'; 