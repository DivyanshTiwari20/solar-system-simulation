'use client';

import { useState, useEffect } from 'react';
import { PlanetLibrary } from '@/components/PlanetLibrary';
import { SolarSystemCanvas } from '@/components/SolarSystemCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import { PlanetCustomizer } from '@/components/PlanetCustomizer';
import { BuilderHeader } from '@/components/BuilderHeader';
import { Planet } from '@/types/planet';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BuilderPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const addPlanet = (planetData: Omit<Planet, 'id'>) => {
    const newPlanet: Planet = {
      ...planetData,
      id: Date.now().toString(),
      angle: 0,
    };
    setPlanets(prev => [...prev, newPlanet]);
  };

  const updatePlanet = (id: string, updates: Partial<Planet>) => {
    setPlanets(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (selectedPlanet?.id === id) {
      setSelectedPlanet(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deletePlanet = (id: string) => {
    setPlanets(prev => prev.filter(p => p.id !== id));
    if (selectedPlanet?.id === id) {
      setSelectedPlanet(null);
      setShowCustomizer(false);
    }
  };

  const clearSystem = () => {
    setPlanets([]);
    setSelectedPlanet(null);
    setShowCustomizer(false);
    setIsSimulating(false);
  };

  const selectPlanet = (planet: Planet) => {
    setSelectedPlanet(planet);
    setShowCustomizer(true);
    if (!rightSidebarOpen) {
      setRightSidebarOpen(true);
    }
  };

  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    
    if (newFullscreenState) {
      // Enter fullscreen
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
      document.documentElement.requestFullscreen?.();
    } else {
      // Exit fullscreen
      setLeftSidebarOpen(true);
      setRightSidebarOpen(true);
      document.exitFullscreen?.();
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
        setLeftSidebarOpen(true);
        setRightSidebarOpen(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50 w-screen h-screen">
        <div className="w-full h-full">
          <SolarSystemCanvas
            planets={planets}
            isSimulating={isSimulating}
            simulationSpeed={simulationSpeed}
            onPlanetClick={selectPlanet}
            onPlanetUpdate={updatePlanet}
          />
        </div>
        
        {/* Minimal fullscreen controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isSimulating ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Exit Fullscreen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <BuilderHeader 
        onClearSystem={clearSystem}
        planetCount={planets.length}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
      
      <div className="flex flex-1 relative overflow-hidden h-full">
        {/* Left Sidebar */}
        <div className={`${leftSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-gray-50 border-r border-gray-200 overflow-hidden flex-shrink-0`}>
          <div className="p-6 h-full overflow-y-auto">
            <PlanetLibrary onAddPlanet={addPlanet} />
          </div>
        </div>

        {/* Left Sidebar Toggle */}
        <Button
          variant="outline"
          size="sm"
          className="absolute left-2 top-4 z-10 bg-white border-gray-300"
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
        >
          {leftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>

        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-black min-w-0 h-full">
          <SolarSystemCanvas
            planets={planets}
            isSimulating={isSimulating}
            simulationSpeed={simulationSpeed}
            onPlanetClick={selectPlanet}
            onPlanetUpdate={updatePlanet}
          />
        </div>

        {/* Right Sidebar Toggle */}
        <Button
          variant="outline"
          size="sm"
          className="absolute right-2 top-4 z-10 bg-white border-gray-300"
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
        >
          {rightSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>

        {/* Right Sidebar */}
        <div className={`${rightSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-gray-50 border-l border-gray-200 overflow-hidden flex-shrink-0`}>
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <ControlPanel
              isSimulating={isSimulating}
              simulationSpeed={simulationSpeed}
              onToggleSimulation={() => setIsSimulating(!isSimulating)}
              onSpeedChange={setSimulationSpeed}
            />
            
            {showCustomizer && selectedPlanet && (
              <PlanetCustomizer
                planet={selectedPlanet}
                onUpdate={(updates) => updatePlanet(selectedPlanet.id, updates)}
                onDelete={() => deletePlanet(selectedPlanet.id)}
                onClose={() => {
                  setShowCustomizer(false);
                  setSelectedPlanet(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}