'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface ControlPanelProps {
  isSimulating: boolean;
  simulationSpeed: number;
  onToggleSimulation: () => void;
  onSpeedChange: (speed: number) => void;
}

export function ControlPanel({
  isSimulating,
  simulationSpeed,
  onToggleSimulation,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <Card className="p-4 border-gray-200">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-black mb-3">Simulation Controls</h3>
          
          <div className="space-y-4">
            <Button
              onClick={onToggleSimulation}
              className={`w-full ${
                isSimulating 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-black">Speed</label>
                <span className="text-sm text-gray-600">{simulationSpeed.toFixed(1)}x</span>
              </div>
              <Slider
                value={[simulationSpeed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-black mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Physics Engine
          </h4>
          <p className="text-sm text-gray-600">
            Watch realistic orbital mechanics in action. Adjust speed to observe 
            gravitational interactions over time.
          </p>
        </div>
      </div>
    </Card>
  );
}