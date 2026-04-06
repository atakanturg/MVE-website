import { motion } from "framer-motion";

export function FinalistCard({ teamName }: { teamName: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      className="bg-transparent border-none py-6 flex flex-col items-start gap-2"
    >
      <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">
        Finalist
      </span>
      <h3 className="text-2xl font-bold text-heading">{teamName}</h3>
    </motion.div>
  );
}
