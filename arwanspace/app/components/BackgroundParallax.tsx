'use client';

import { useEffect, useState } from 'react';

const CLOUDS = [
  { id: 1, src: '/assets/clouds/cloud-pic1.png', speedX: 0.05, speedY: 0.02, initialX: 10, initialY: 20, width: 300, opacity: 0.8 },
  { id: 2, src: '/assets/clouds/cloud-pic2.png', speedX: 0.02, speedY: 0.05, initialX: 60, initialY: 40, width: 450, opacity: 0.6 },
  { id: 3, src: '/assets/clouds/cloud-pic3.png', speedX: 0.08, speedY: 0.01, initialX: 30, initialY: 70, width: 250, opacity: 0.9 },
  { id: 4, src: '/assets/clouds/cloud-pic1.png', speedX: 0.03, speedY: 0.06, initialX: 80, initialY: 10, width: 350, opacity: 0.7 },
];

export default function BackgroundParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initial call to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-20] overflow-hidden">
      {CLOUDS.map((cloud) => {
        const yOffset = scrollY * cloud.speedY * -1;
        const xOffset = mousePos.x * cloud.speedX * 50;
        const myOffset = mousePos.y * cloud.speedY * 50;

        let gradient = 'bg-white/70';
        if (cloud.id === 1) gradient = 'bg-gradient-to-tr from-pink-500 to-orange-400';
        else if (cloud.id === 2) gradient = 'bg-gradient-to-tr from-cyan-400 to-blue-500';
        else if (cloud.id === 3) gradient = 'bg-gradient-to-tr from-purple-500 to-pink-500';
        else if (cloud.id === 4) gradient = 'bg-gradient-to-tr from-yellow-400 to-orange-500';

        return (
          <div
            key={cloud.id}
            className={`absolute rounded-full ${gradient} blur-[40px] mix-blend-screen transition-transform duration-300 ease-out`}
            style={{
              left: `${cloud.initialX}%`,
              top: `${cloud.initialY}%`,
              width: `${cloud.width}px`,
              height: `${cloud.width}px`,
              opacity: 0.9,
              transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset + myOffset}px), 0)`,
            }}
          />
        );
      })}
    </div>
  );
}
