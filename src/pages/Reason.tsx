import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";

export function Reason() {
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
  const initialScale = 1.4 + (2.0 - 1.4) * t; // Reduced max scale to 2.0 to prevent overflow
  const finalScale = 0.6 + (0.45 - 0.6) * t; // Smaller final scale for header
  const initialY = 18 + (35 - 18) * t;
  const finalY = 5 + (8 - 5) * t;

  const scale = useTransform(scrollY, [0, 300], [initialScale, finalScale]);
  const y = useTransform(scrollY, [0, 300], [`${initialY}vh`, `${finalY}vh`]);
  const subtitlesOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const headerBgOpacity = useTransform(scrollY, [200, 300], [0, 0.95]);

  return (
    <div className="flex flex-col min-h-screen tracking-wide bg-transparent relative pt-4 md:pt-8 pointer-events-auto">
      
      {/* Back Link positioned absolutely so it stays at the top of the initial scroll area */}
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
      {/* Structural padding to ensure ONLY REASON is visible initially */}
      <div className="w-full h-screen pointer-events-none" />

      {/* Fixed Sticky Header Overlay - Doesn't affect document flow! */}
      <div className="fixed top-0 w-full min-h-[25vh] z-30 pointer-events-none flex flex-col justify-start">
        <motion.div style={{ opacity: headerBgOpacity }} className="absolute inset-0 bg-white/20 backdrop-blur-md border-b border-[#7A92A8]/20" />
        
        <motion.div style={{ scale, y }} className="relative z-10 flex flex-col items-center origin-top w-full">
          <h1 className="font-extrabold text-[clamp(2.5rem,13vw,6.5rem)] leading-none tracking-[0.2em] text-primary font-heading uppercase ml-[0.1em]">
            {"REASON".split('').map((char, index) => (
              <span key={index} className="transition-colors duration-300 cursor-default pointer-events-auto">
                {char}
              </span>
            ))}
          </h1>
          <motion.h2 
            style={{ opacity: subtitlesOpacity }} 
            className="text-2xl md:text-3xl font-bold text-heading tracking-[0.2em] mt-0 whitespace-nowrap uppercase"
          >
            Case Study Workshop
          </motion.h2>
        </motion.div>
      </div>

      {/* Main Content Layer - Starts sliding UP instantly with natural scroll! */}
      <div className="relative z-20 pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">

          
          <div className="mb-12">
            <span className="bg-transparent border-b border-[#7A92A8]/30 text-primary px-2 py-2 rounded-none text-sm font-semibold tracking-widest uppercase">
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
            REASON is a case study driven workshop where we bring in professionals from the Ransom Everglades alumni and parent network. Students participate in structured breakout rooms, working through real business cases with industry mentors.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-6 rounded-none">
              <h3 className="text-heading font-semibold mb-2 font-serif font-bold text-xl uppercase tracking-widest">Alumni & Parent Network</h3>
              <p className="text-sm text-foreground/70">Details coming soon</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-6 rounded-none">
              <h3 className="text-heading font-semibold mb-2 font-serif font-bold text-xl uppercase tracking-widest">Breakout Rooms</h3>
              <p className="text-sm text-foreground/70">Details coming soon</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-transparent border-t border-[#7A92A8]/30 pt-6 rounded-none">
              <h3 className="text-heading font-semibold mb-2 font-serif font-bold text-xl uppercase tracking-widest">Case Studies</h3>
              <p className="text-sm text-foreground/70">Details coming soon</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <p className="text-lg text-foreground/80 mb-6 font-light">
              Are you an alumni or parent interested in serving as an industry professional in our breakout sessions?
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center border-b-2 border-primary hover:border-[#111111] text-primary hover:text-heading transition-colors font-medium tracking-widest uppercase pointer-events-auto z-50 py-1"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
