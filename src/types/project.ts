export type Project = {
  id: string;
  title: string;
  description: string;
  introduction: string;
  requirements: string[];
  technologies: string[];
  challenges: string[];
  tags: string[];
  image?: string;
  notice?: string;
  architecture?: {
    title: string;
    description: string;
    architectureImage?: string;
  };
}; 