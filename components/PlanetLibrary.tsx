'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Planet } from '@/types/planet';
import { Plus } from 'lucide-react';

interface PlanetLibraryProps {
  onAddPlanet: (planet: Omit<Planet, 'id'>) => void;
}

const planetTemplates = [
  // Inner Rocky Planets
  {
    name: 'Mercury',
    type: 'rocky' as const,
    size: 8,
    color: '#8C7853',
    mass: 0.33,
    orbitSpeed: 0.048,
    habitabilityScore: 0.1,
    description: 'Closest to the sun, extreme temperatures'
  },
  {
    name: 'Venus',
    type: 'rocky' as const,
    size: 12,
    color: '#FFC649',
    mass: 0.82,
    orbitSpeed: 0.035,
    habitabilityScore: 0.2,
    description: 'Hottest planet, thick atmosphere'
  },
  {
    name: 'Earth',
    type: 'rocky' as const,
    size: 13,
    color: '#6B93D6',
    mass: 1,
    orbitSpeed: 0.03,
    habitabilityScore: 1.0,
    description: 'Perfect for life, liquid water'
  },
  {
    name: 'Mars',
    type: 'rocky' as const,
    size: 10,
    color: '#CD5C5C',
    mass: 0.64,
    orbitSpeed: 0.024,
    habitabilityScore: 0.6,
    description: 'Red planet, polar ice caps'
  },
  
  // Gas Giants
  {
    name: 'Jupiter',
    type: 'gas-giant' as const,
    size: 45,
    color: '#D8CA9D',
    mass: 11.2,
    orbitSpeed: 0.013,
    hasRings: false,
    moons: 79,
    description: 'Largest planet, Great Red Spot'
  },
  {
    name: 'Saturn',
    type: 'gas-giant' as const,
    size: 38,
    color: '#FAD5A5',
    mass: 9.4,
    orbitSpeed: 0.0096,
    hasRings: true,
    moons: 82,
    description: 'Beautiful ring system'
  },
  
  // Ice Giants
  {
    name: 'Uranus',
    type: 'ice-giant' as const,
    size: 25,
    color: '#4FD0E7',
    mass: 4.0,
    orbitSpeed: 0.0068,
    hasRings: true,
    moons: 27,
    description: 'Tilted on its side, methane atmosphere'
  },
  {
    name: 'Neptune',
    type: 'ice-giant' as const,
    size: 24,
    color: '#4B70DD',
    mass: 3.9,
    orbitSpeed: 0.0054,
    moons: 14,
    description: 'Windiest planet, deep blue color'
  },
  
  // Dwarf Planets
  {
    name: 'Pluto',
    type: 'dwarf' as const,
    size: 6,
    color: '#C4A484',
    mass: 0.18,
    orbitSpeed: 0.0047,
    moons: 5,
    description: 'Former ninth planet, icy surface'
  },
  {
    name: 'Ceres',
    type: 'dwarf' as const,
    size: 5,
    color: '#A8A8A8',
    mass: 0.15,
    orbitSpeed: 0.021,
    description: 'Largest asteroid, water ice'
  },
  
  // Exoplanets
  {
    name: 'Kepler-452b',
    type: 'rocky' as const,
    size: 16,
    color: '#7FB069',
    mass: 1.6,
    orbitSpeed: 0.027,
    habitabilityScore: 0.9,
    description: 'Earth\'s cousin, potentially habitable'
  },
  {
    name: 'HD 209458 b',
    type: 'gas-giant' as const,
    size: 42,
    color: '#FF6B35',
    mass: 8.3,
    orbitSpeed: 0.089,
    description: 'Hot Jupiter, evaporating atmosphere'
  }
];

export function PlanetLibrary({ onAddPlanet }: PlanetLibraryProps) {
  const handleAddPlanet = (template: typeof planetTemplates[0]) => {
    // Random orbital position
    const angle = Math.random() * Math.PI * 2;
    const orbitRadius = 100 + Math.random() * 300;
    
    onAddPlanet({
      ...template,
      x: Math.cos(angle) * orbitRadius,
      y: Math.sin(angle) * orbitRadius,
      orbitRadius,
      angle,
    });
  };

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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black mb-2">Celestial Bodies</h2>
        <p className="text-sm text-gray-600">Add planets and other objects to your solar system</p>
      </div>
      
      <div className="space-y-3">
        {planetTemplates.map((template, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full border border-gray-200"
                  style={{ backgroundColor: template.color }}
                />
                <div>
                  <h3 className="font-medium text-black">{template.name}</h3>
                  <Badge variant="secondary" className={getTypeColor(template.type)}>
                    {template.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mb-3">{template.description}</p>
            
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
              <span>Size: {template.size}px</span>
              <span>Mass: {template.mass}x</span>
              {template.moons && <span>Moons: {template.moons}</span>}
              {template.hasRings && <span>Rings: Yes</span>}
              {template.habitabilityScore && (
                <span>Habitable: {(template.habitabilityScore * 100).toFixed(0)}%</span>
              )}
            </div>
            
            <Button
              onClick={() => handleAddPlanet(template)}
              className="w-full bg-black hover:bg-gray-800 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to System
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-black mb-2">Instructions</h3>
        <p className="text-sm text-gray-600">
          Click "Add to System" to place a celestial body in your solar system. 
          Drag planets to adjust their orbits, and use the controls to customize properties.
        </p>
      </div>
    </div>
  );
}