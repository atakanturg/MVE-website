import { motion } from "framer-motion";
import { Link } from "wouter";

export function Competitions() {
  return (
    <div className="flex flex-col min-h-screen tracking-wide bg-background pointer-events-auto">
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
        
        {/* Back Link */}
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

        <motion.div className="absolute top-24 z-20">
           <span className="bg-transparent border-b border-[#7A92A8]/30 text-primary px-2 py-2 rounded-none text-sm font-semibold tracking-widest uppercase shadow-none">
            Coming Soon
          </span>
        </motion.div>

        <motion.div 
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 80, delay: 0.3 }}
          className="flex justify-center w-full z-10 px-4 mt-16"
        >
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter text-primary text-center uppercase">
            {"ECONOMIC COMPETITIONS".split('').map((char, index) => (
              <span key={index} className="transition-colors duration-300 cursor-default inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center mt-12 px-6 text-center z-10 w-full"
        >
          <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed max-w-2xl border-l-2 border-primary pl-6 mx-auto">
            Registration for the economics teams of Ransom Everglades will begin to open <strong className="text-primary font-bold">RIGHT HERE</strong> starting in August 2026.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
