export interface Planet {
  id: string;
  name: string;
  type: 'rocky' | 'gas-giant' | 'ice-giant' | 'dwarf';
  size: number; // radius in pixels
  color: string;
  x: number; // position relative to center
  y: number;
  orbitRadius: number; // distance from center
  orbitSpeed: number; // radians per frame
  angle: number; // current orbital position
  mass: number; // for physics calculations
  hasRings?: boolean;
  moons?: number;
  habitabilityScore?: number;
  description?: string;
}