import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";

export function Sfere() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollY } = useScroll();

  // Continuous interpolation: 0 at 320px, 1 at 1440px
  const t = Math.min(1, Math.max(0, (screenWidth - 320) / (1440 - 320)));
  const initialScale = 1.5 + (1.9 - 1.5) * t; // Reduced max scale to 1.9 to prevent overflow
  const finalScale = 0.6 + (0.45 - 0.6) * t; // Smaller final scale for header
  const initialY = 18 + (35 - 18) * t;
  const finalY = 5 + (8 - 5) * t;

  const scale = useTransform(scrollY, [0, 300], [initialScale, finalScale]);
  const y = useTransform(scrollY, [0, 300], [`${initialY}vh`, `${finalY}vh`]);
  const subtitlesOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const headerBgOpacity = useTransform(scrollY, [200, 300], [0, 0.95]);

  return (
    <div className="flex flex-col min-h-screen tracking-wide bg-transparent relative pt-4 md:pt-8 pointer-events-auto">
      
      {/* Back Link positioned absolutely */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-28 left-6 md:left-12 z-40 pointer-events-auto"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
        >
          <span>←</span> Home
        </Link>
      </motion.div>
      {/* Structural padding to ensure ONLY SFERE is visible initially */}
      <div className="w-full h-screen pointer-events-none" />

      {/* Fixed Sticky Header Overlay - Doesn't affect document flow! */}
      <div className="fixed top-0 w-full min-h-[25vh] z-30 pointer-events-none flex flex-col justify-start">
        <motion.div style={{ opacity: headerBgOpacity }} className="absolute inset-0 bg-white/20 backdrop-blur-md border-b border-[#7A92A8]/20" />
        
        <motion.div style={{ scale, y }} className="relative z-10 flex flex-col items-center origin-top w-full">
          <h1 className="font-extrabold text-[clamp(3rem,15vw,9rem)] leading-none tracking-[0.2em] text-primary font-heading uppercase ml-[0.1em]">
            {"SFERE".split('').map((char, index) => (
              <span key={index} className="transition-colors duration-300 cursor-default pointer-events-auto">
                {char}
              </span>
            ))}
          </h1>
          <motion.h2 
            style={{ opacity: subtitlesOpacity }} 
            className="text-2xl md:text-3xl font-bold text-heading tracking-widest mt-0 whitespace-nowrap uppercase"
          >
            Economic Symposium
          </motion.h2>
        </motion.div>
      </div>

      {/* Main Content Layer - Starts sliding UP instantly with natural scroll! */}
      <div className="relative z-20 pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="mb-12">
            <span className="bg-transparent border-b border-[#7A92A8]/30 text-primary px-2 py-2 rounded-none text-sm font-semibold tracking-widest uppercase shadow-none">
              Coming Soon
            </span>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-lg text-foreground/90 font-light leading-relaxed max-w-3xl mb-16 border-l-2 border-border pl-6"
          >
            SFERE is an economic symposium hosted by MVE featuring highlighted keynote speakers, student poster board presentations, and a guest panel of industry professionals. Details for the upcoming event will be announced soon.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6 w-full"
          >
            {/* Row 1: Guest Panel (Wide) */}
            <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-8 rounded-none flex flex-col items-start gap-6 w-full pointer-events-auto">
              <div>
                <h3 className="text-heading font-serif font-bold text-2xl uppercase tracking-widest">Guest Panel</h3>
                <p className="text-sm text-foreground/70 mt-2 max-w-2xl">Explore insights from global leaders and industry professionals across previous and upcoming symposium panels.</p>
              </div>
              <div className="flex flex-wrap gap-6 w-full mt-4">
                <Link 
                  href="/sfere/keynotes/2026"
                  className="inline-flex items-center justify-center border-b-2 border-primary bg-transparent text-primary hover:border-[#111111] hover:text-heading transition-colors text-sm tracking-widest uppercase font-bold py-1"
                >
                  2026 Selection
                </Link>
                <Link 
                  href="/sfere/keynotes/2025"
                  className="inline-flex items-center justify-center border-b-2 border-primary bg-transparent text-primary hover:border-[#111111] hover:text-heading transition-colors text-sm tracking-widest uppercase font-bold py-1"
                >
                  2025 Panelists
                </Link>
                <Link 
                  href="/sfere/keynotes/2024"
                  className="inline-flex items-center justify-center border-b-2 border-primary bg-transparent text-primary hover:border-[#111111] hover:text-heading transition-colors text-sm tracking-widest uppercase font-bold py-1"
                >
                  2024 Panelists
                </Link>
              </div>
            </motion.div>

            {/* Row 2: Poster Board and Keynote Speakers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-8">
              <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-8 rounded-none flex flex-col min-h-[160px]">
                <div>
                  <h3 className="text-heading font-serif font-bold text-xl uppercase tracking-widest">Poster Board Presentations</h3>
                </div>
                <p className="text-sm text-foreground/60 font-medium tracking-widest uppercase mt-6">2027 theme coming soon</p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-8 rounded-none flex flex-col min-h-[160px]">
                <div>
                  <h3 className="text-heading font-serif font-bold text-xl uppercase tracking-widest">Keynote Speakers</h3>
                </div>
                <Link 
                  href="/sfere/recent-keynotes"
                  className="mt-6 text-primary font-sans font-bold tracking-widest uppercase text-sm hover:text-heading transition-colors pointer-events-auto inline-flex items-center gap-2"
                >
                  Click to see recent presentations <span className="text-lg leading-none">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
