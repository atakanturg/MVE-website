import { motion } from "framer-motion";

interface TimelineRowProps {
  milestone: string;
  date: string;
  isLast?: boolean;
}

export function TimelineRow({ milestone, date, isLast = false }: TimelineRowProps) {
  const isTBD = date === "TBD";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 }
      }}
      className="flex gap-10 items-start group"
    >
      {/* Left: date marker */}
      <div className="flex flex-col items-end pt-1 w-24 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
        <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${isTBD ? "text-foreground/70" : "text-primary/80"}`}>
          {date}
        </span>
        <div className={`h-px w-6 mt-2 ${isTBD ? "bg-foreground/20" : "bg-primary/30"}`} />
      </div>

      {/* Right: text */}
      <div className={`flex flex-col pb-12 ${isLast ? "pb-0" : ""}`}>
        <span className="text-foreground/90 font-bold tracking-widest uppercase text-base group-hover:text-primary transition-colors duration-300">{milestone}</span>
        {!isLast && <div className="h-px bg-[#7A92A8]/10 w-full mt-4" />}
      </div>
    </motion.div>
  );
}
