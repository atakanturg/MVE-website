import { Link } from "wouter";
import { motion } from "framer-motion";

interface ProgramCardProps {
  title: string;
  description?: string;
  href: string;
  status: string;
}

export function ProgramCard({ title, href, status }: ProgramCardProps) {
  return (
    <Link href={href}>
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block bg-[#152030] border border-border rounded-none p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-colors text-center min-h-[120px]"
      >
        <h3 className="text-xl font-bold text-heading">{title}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-none font-medium ${
            status === "Active"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20"
          }`}
        >
          {status}
        </span>
      </motion.a>
    </Link>
  );
}
