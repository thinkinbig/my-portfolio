'use client';

import { useParams } from 'next/navigation';
import WebIDEProject from '../web-ide/page';
import SystemDesignProject from '../tum-sysprog/page';
import NotFound from '@/app/not-found';

export default function ProjectPage() {
  const { id } = useParams();
  
  switch (id) {
    case 'web-ide':
      return <WebIDEProject />;
    case 'tum-sysprog':
      return <SystemDesignProject />;
    default:
      return <NotFound />;
  }
} 