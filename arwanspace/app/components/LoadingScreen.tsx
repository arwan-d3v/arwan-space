'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth interpolation for the counter
    const start = displayProgress;
    const end = progress;
    if (start === end) return;

    const duration = 500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);

      setDisplayProgress(Math.floor(start + (end - start) * easeOut));

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayProgress(end);
      }
    };

    requestAnimationFrame(animate);
  }, [progress, displayProgress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/10 backdrop-blur-[30px]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
    >
      <div className="text-6xl font-bold text-slate-100 mb-8 font-mono">
        {displayProgress}%
      </div>
      <div className="w-[300px] h-1 bg-gray-200/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7ec8e3 0%, #f7a072 100%)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
