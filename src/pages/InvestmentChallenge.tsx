import { motion } from "framer-motion";
import { Link } from "wouter";

export function InvestmentChallenge() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center tracking-wide bg-transparent pointer-events-auto">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full mb-10 text-left"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
        >
          <span>←</span> Home
        </Link>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <span className="bg-transparent border-b border-[#7A92A8]/30 text-primary px-1 py-2 rounded-none text-sm font-semibold tracking-widest uppercase shadow-none">
          New This Year
        </span>
      </motion.div>

      {/* Hero */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-extrabold text-heading tracking-tight mb-8 font-heading uppercase tracking-widest"
      >
        Investment Challenge
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-2xl mb-12 font-serif focus-within:"
      >
        The MVE Fund is a new MVE program launching this year. More details will be announced soon.
      </motion.p>
    </div>
  );
}
