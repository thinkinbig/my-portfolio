import { Concept } from '@/types/notion';

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