'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, X, Settings2 } from 'lucide-react';
import { Planet } from '@/types/planet';

interface PlanetCustomizerProps {
  planet: Planet;
  onUpdate: (updates: Partial<Planet>) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function PlanetCustomizer({
  planet,
  onUpdate,
  onDelete,
  onClose,
}: PlanetCustomizerProps) {
  const [localPlanet, setLocalPlanet] = useState(planet);

  const handleUpdate = (updates: Partial<Planet>) => {
    const newPlanet = { ...localPlanet, ...updates };
    setLocalPlanet(newPlanet);
    onUpdate(updates);
  };

  const colors = [
    '#8C7853', '#FFC649', '#6B93D6', '#CD5C5C',
    '#D8CA9D', '#FAD5A5', '#4FD0E7', '#4B70DD',
    '#C4A484', '#A8A8A8', '#7FB069', '#FF6B35'
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rocky': return 'bg-orange-100 text-orange-800';
      case 'gas-giant': return 'bg-purple-100 text-purple-800';
      case 'ice-giant': return 'bg-blue-100 text-blue-800';
      case 'dwarf': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-4 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black flex items-center">
          <Settings2 className="w-4 h-4 mr-2" />
          Customize Planet
        </h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-black"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Planet Name */}
        <div>
          <Label className="text-sm font-medium text-black">Name</Label>
          <Input
            value={localPlanet.name}
            onChange={(e) => handleUpdate({ name: e.target.value })}
            className="mt-1 border-gray-300"
          />
        </div>

        {/* Planet Type */}
        <div>
          <Label className="text-sm font-medium text-black mb-2 block">Type</Label>
          <Badge variant="secondary" className={getTypeColor(localPlanet.type)}>
            {localPlanet.type.replace('-', ' ')}
          </Badge>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="text-sm font-medium text-black mb-2 block">Color</Label>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleUpdate({ color })}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  localPlanet.color === color 
                    ? 'border-black scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-black">Size</Label>
            <span className="text-sm text-gray-600">{localPlanet.size}px</span>
          </div>
          <Slider
            value={[localPlanet.size]}
            onValueChange={(value) => handleUpdate({ size: value[0] })}
            max={50}
            min={5}
            step={1}
            className="w-full"
          />
        </div>

        {/* Orbit Speed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-black">Orbit Speed</Label>
            <span className="text-sm text-gray-600">{(localPlanet.orbitSpeed * 1000).toFixed(1)}</span>
          </div>
          <Slider
            value={[localPlanet.orbitSpeed * 1000]}
            onValueChange={(value) => handleUpdate({ orbitSpeed: value[0] / 1000 })}
            max={100}
            min={1}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Mass */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-black">Mass</Label>
            <span className="text-sm text-gray-600">{localPlanet.mass}x</span>
          </div>
          <Slider
            value={[localPlanet.mass]}
            onValueChange={(value) => handleUpdate({ mass: value[0] })}
            max={20}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Planet Info */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-black mb-2">Properties</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Orbit Radius: {localPlanet.orbitRadius.toFixed(0)}px</div>
            {localPlanet.habitabilityScore && (
              <div>Habitability: {(localPlanet.habitabilityScore * 100).toFixed(0)}%</div>
            )}
            {localPlanet.hasRings && <div>Features: Planetary rings</div>}
            {localPlanet.moons && <div>Moons: {localPlanet.moons}</div>}
          </div>
        </div>

        {/* Delete Button */}
        <Button
          onClick={onDelete}
          variant="destructive"
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Planet
        </Button>
      </div>
    </Card>
  );
}