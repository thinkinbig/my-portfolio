'use client';

import { useParams } from 'next/navigation';
import WebIDEProject from '../web-ide/page';
import NotFound from '@/app/not-found';
import TUMSysProg from '../tum-sysprog/page';
import ERPPlugins from '../erp-plugins/page';
import RAGSystem from '../rag-system/page';

export default function ProjectPage() {
  const { id } = useParams();
  
  switch (id) {
    case 'web-ide':
      return <WebIDEProject />;
    case 'tum-sysprog':
      return <TUMSysProg />;
    case 'erp-plugins':
      return <ERPPlugins />;
    case 'rag-system':
      return <RAGSystem />;
    default:
      return <NotFound />;
  }
} 