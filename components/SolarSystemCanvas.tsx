'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Planet } from '@/types/planet';

interface SolarSystemCanvasProps {
  planets: Planet[];
  isSimulating: boolean;
  simulationSpeed: number;
  onPlanetClick: (planet: Planet) => void;
  onPlanetUpdate: (id: string, updates: Partial<Planet>) => void;
}

export function SolarSystemCanvas({
  planets,
  isSimulating,
  simulationSpeed,
  onPlanetClick,
  onPlanetUpdate,
}: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [draggedPlanet, setDraggedPlanet] = useState<string | null>(null);
  const starsRef = useRef<Array<{x: number, y: number, size: number, opacity: number}>>([]);
  const lastUpdateTime = useRef<number>(0);

  // Memoize stars to prevent recreation
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.3
    }));
  }, []);

  useEffect(() => {
    starsRef.current = stars;
  }, [stars]);

  // Optimized canvas resize with proper viewport sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let resizeTimeout: NodeJS.Timeout;
    
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Get the actual container dimensions
        const containerRect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas size to match container exactly
        canvas.width = containerRect.width * dpr;
        canvas.height = containerRect.height * dpr;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        // Set CSS size to match container
        canvas.style.width = containerRect.width + 'px';
        canvas.style.height = containerRect.height + 'px';
      }, 50);
    };

    // Initial resize
    resizeCanvas();
    
    // Use ResizeObserver for better container size detection
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    
    // Fallback for window resize
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Optimized animation loop with frame rate control
  useEffect(() => {
    if (!isSimulating) return;

    const animate = (currentTime: number) => {
      // Limit to 60fps
      if (currentTime - lastUpdateTime.current < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastUpdateTime.current = currentTime;

      // Batch planet updates
      const updates: Array<{id: string, updates: Partial<Planet>}> = [];
      
      planets.forEach(planet => {
        const newAngle = planet.angle + planet.orbitSpeed * simulationSpeed;
        const x = Math.cos(newAngle) * planet.orbitRadius;
        const y = Math.sin(newAngle) * planet.orbitRadius;
        
        updates.push({
          id: planet.id,
          updates: { angle: newAngle, x, y }
        });
      });

      // Apply all updates at once
      updates.forEach(({ id, updates }) => {
        onPlanetUpdate(id, updates);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, simulationSpeed, planets.length, onPlanetUpdate]);

  // Optimized drawing with proper viewport centering
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drawAnimationId: number;

    const draw = () => {
      // Get actual canvas display size
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, containerRect.width, containerRect.height);

      // Draw stars
      ctx.fillStyle = 'white';
      starsRef.current.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(
          star.x * containerRect.width, 
          star.y * containerRect.height, 
          star.size, 
          star.size
        );
      });
      ctx.globalAlpha = 1;

      // Draw sun with simplified gradient
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      sunGradient.addColorStop(0, '#FFF700');
      sunGradient.addColorStop(0.7, '#FFA500');
      sunGradient.addColorStop(1, 'rgba(255, 165, 0, 0.2)');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbit paths
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      planets.forEach(planet => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw planets
      planets.forEach(planet => {
        const planetX = centerX + planet.x;
        const planetY = centerY + planet.y;

        // Only draw if planet is within visible area (with some margin)
        if (planetX >= -50 && planetX <= containerRect.width + 50 && 
            planetY >= -50 && planetY <= containerRect.height + 50) {
          
          // Simplified planet rendering
          ctx.fillStyle = planet.color;
          ctx.beginPath();
          ctx.arc(planetX, planetY, planet.size, 0, Math.PI * 2);
          ctx.fill();

          // Planet rings (simplified)
          if (planet.hasRings) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(planetX, planetY, planet.size + 8, (planet.size + 8) * 0.15, 0, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Planet name (only when not simulating for performance)
          if (!isSimulating) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(planet.name, planetX, planetY + planet.size + 16);
          }
        }
      });

      drawAnimationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (drawAnimationId) {
        cancelAnimationFrame(drawAnimationId);
      }
    };
  }, [planets, isSimulating]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left - containerRect.width / 2;
    const y = e.clientY - containerRect.top - containerRect.height / 2;

    const clickedPlanet = planets.find(planet => {
      const distance = Math.sqrt((x - planet.x) ** 2 + (y - planet.y) ** 2);
      return distance <= planet.size;
    });

    if (clickedPlanet) {
      onPlanetClick(clickedPlanet);
      setDraggedPlanet(clickedPlanet.id);
    }
  }, [planets, onPlanetClick]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !draggedPlanet) return;

    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left - containerRect.width / 2;
    const y = e.clientY - containerRect.top - containerRect.height / 2;

    const orbitRadius = Math.sqrt(x ** 2 + y ** 2);
    const angle = Math.atan2(y, x);

    onPlanetUpdate(draggedPlanet, {
      x,
      y,
      orbitRadius,
      angle,
    });
  }, [draggedPlanet, onPlanetUpdate]);

  const handleMouseUp = useCallback(() => {
    setDraggedPlanet(null);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer block"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ touchAction: 'none' }}
      />
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-black border border-gray-200 text-sm">
        <div className="font-medium mb-1">Solar System</div>
        <div className="text-xs text-gray-600">
          {planets.length} bodies • {isSimulating ? 'Active' : 'Paused'}
        </div>
      </div>
    </div>
  );
}