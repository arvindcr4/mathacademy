"use client";

import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  delay: number;
}

const COLORS = [
  "var(--xp-gold)",
  "var(--mastery-blue)",
  "#3FB950",
  "#E05252",
  "#D4A72C",
];

export default function Confetti({
  active,
  duration = 2000,
}: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 720,
      delay: Math.random() * 500,
    }));

    setParticles(newParticles);

    const cleanup = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(cleanup);
  }, [active, duration]);

  if (particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color.includes("var(")
              ? undefined
              : particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confetti-fall ${duration}ms ease-in-out forwards`,
            animationDelay: `${particle.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
