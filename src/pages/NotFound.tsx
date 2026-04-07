import { motion } from "framer-motion";
import { Link } from "wouter";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center tracking-wide relative overflow-hidden pointer-events-auto">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-8xl md:text-[180px] font-extrabold text-heading tracking-tighter mb-4 opacity-10 absolute pointer-events-none select-none"
      >
        404
      </motion.h1>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl font-extrabold text-heading tracking-tight mb-4 z-10"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-muted-foreground font-light mb-10 z-10"
      >
        Page not found.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10"
      >
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors">
            <span aria-hidden="true">&larr;</span> Back to Home
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
