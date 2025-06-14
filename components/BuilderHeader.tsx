'use client';

import { Button } from '@/components/ui/button';
import { Orbit, RotateCcw, Share2, Maximize2, Minimize2, Home } from 'lucide-react';
import Link from 'next/link';

interface BuilderHeaderProps {
  onClearSystem: () => void;
  planetCount: number;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export function BuilderHeader({ 
  onClearSystem, 
  planetCount, 
  onToggleFullscreen, 
  isFullscreen 
}: BuilderHeaderProps) {
  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing solar system...');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
          <Orbit className="w-6 h-6 text-black" />
          <h1 className="text-xl font-semibold text-black">Solar System Builder</h1>
        </Link>
        <div className="text-sm text-gray-600">
          {planetCount} {planetCount === 1 ? 'celestial body' : 'celestial bodies'}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFullscreen}
          className="border-gray-300 hover:bg-gray-50"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="border-gray-300 hover:bg-gray-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearSystem}
          className="border-gray-300 hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </header>
  );
}