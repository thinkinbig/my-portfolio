'use client';

import { useParams } from 'next/navigation';
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import WebIDEProject from '../web-ide/page';

export default function ProjectPage() {
  const { id } = useParams();
  
  if (id === 'web-ide') {
    return <WebIDEProject />;
  }

  return <ProjectDetail />;
} 