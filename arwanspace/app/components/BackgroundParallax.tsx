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
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[-20] overflow-hidden">
      {CLOUDS.map((cloud) => {
        const yOffset = scrollY * cloud.speedY * -1;
        const xOffset = mousePos.x * cloud.speedX * 50;
        const myOffset = mousePos.y * cloud.speedY * 50;
        const hasError = imageErrors[cloud.id];

        const style = {
          left: `${cloud.initialX}%`,
          top: `${cloud.initialY}%`,
          width: `${cloud.width}px`,
          height: hasError ? `${cloud.width}px` : 'auto',
          opacity: cloud.opacity,
          transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset + myOffset}px), 0)`,
        };

        if (hasError) {
          return (
            <div
              key={cloud.id}
              className="absolute rounded-full bg-white/70 blur-[60px] transition-transform duration-300 ease-out"
              style={style}
            />
          );
        }

        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={cloud.id}
            src={cloud.src}
            alt="cloud"
            onError={() => handleImageError(cloud.id)}
            className="absolute transition-transform duration-300 ease-out drop-shadow-xl object-contain"
            style={style}
          />
        );
      })}
    </div>
  );
}
