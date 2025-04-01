import { Header } from '@/components/layout/Header';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-4 pb-16">
        {children}
      </main>
    </div>
  );
} 