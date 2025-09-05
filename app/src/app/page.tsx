import { TideViewer } from '@/components/tide/TideViewer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <TideViewer month={9} year={2025} />
      </div>
    </div>
  );
}
