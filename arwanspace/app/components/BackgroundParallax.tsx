'use client';

import { useEffect, useState } from 'react';

// You will need to replace these with actual paths to your cloud images
// For now, these are placeholder paths. Add actual images to public/assets/clouds/
const CLOUDS = [
  { id: 1, src: '/assets/clouds/cloud1.png', speedX: 0.05, speedY: 0.02, initialX: 10, initialY: 20, width: 300, opacity: 0.6 },
  { id: 2, src: '/assets/clouds/cloud2.png', speedX: 0.02, speedY: 0.05, initialX: 70, initialY: 50, width: 450, opacity: 0.4 },
  { id: 3, src: '/assets/clouds/cloud3.png', speedX: 0.08, speedY: 0.01, initialX: 30, initialY: 80, width: 200, opacity: 0.7 },
  { id: 4, src: '/assets/clouds/cloud1.png', speedX: 0.03, speedY: 0.06, initialX: 80, initialY: 10, width: 350, opacity: 0.5 },
];

export default function BackgroundParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {CLOUDS.map((cloud) => {
        // Calculate transform based on scroll and mouse position
        const yOffset = scrollY * cloud.speedY * -1;
        const xOffset = mousePos.x * cloud.speedX * 50;
        const myOffset = mousePos.y * cloud.speedY * 50;

        return (
          <div
            key={cloud.id}
            className="absolute transition-transform duration-300 ease-out"
            style={{
              left: `${cloud.initialX}%`,
              top: `${cloud.initialY}%`,
              transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset + myOffset}px), 0)`,
              opacity: cloud.opacity,
            }}
          >
            {/* Fallback to a styled div if image is missing, you should add actual images later */}
            <div
              className="bg-white/40 blur-3xl rounded-[100%]"
              style={{ width: cloud.width, height: cloud.width * 0.6 }}
            />
            {/* When you have real images, use this instead:
            <img src={cloud.src} alt="cloud" style={{ width: cloud.width }} className="opacity-80 drop-shadow-xl" />
            */}
          </div>
        );
      })}
    </div>
  );
}
