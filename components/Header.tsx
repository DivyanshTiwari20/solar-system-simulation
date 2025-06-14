'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw, Share2 } from 'lucide-react';

interface HeaderProps {
  onClearSystem: () => void;
  planetCount: number;
}

export function Header({ onClearSystem, planetCount }: HeaderProps) {
  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing solar system...');
  };

  return (
    <header className="h-20 bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Solar System Builder</h1>
        </div>
        <div className="text-sm text-white/60">
          {planetCount} {planetCount === 1 ? 'planet' : 'planets'}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearSystem}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </header>
  );
}