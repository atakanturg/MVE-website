import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const obj = { value: 0 };
    // GSAP Cinematic Counter (2.5 seconds)
    gsap.to(obj, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      },
      onComplete: () => {
        setTimeout(() => {
          setShowLogo(true);
        }, 200);
      }
    });
  }, []);

  useEffect(() => {
      if (showLogo) {
          // Stay on logo for 1.5 seconds then complete
          setTimeout(() => {
              onComplete();
          }, 2000);
      }
  }, [showLogo, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div
            key="counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-[#4CAF7D] tabular-nums">
              {count.toString().padStart(3, '0')}
            </span>
            <motion.div 
                className="h-[1px] bg-primary mt-4"
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                style={{ backgroundColor: '#4CAF7D' }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-[0.4em] text-[#4CAF7D] drop-shadow-[0_0_25px_rgba(76,175,125,0.6)]">
              MVE
            </h1>
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#7A92A8] text-xs font-bold tracking-[0.6em] mt-6 ml-4"
            >
                MIAMI VENTURING ENTREPRENEURS
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background bioluminescent drift during load */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>
    </motion.div>
  );
}
