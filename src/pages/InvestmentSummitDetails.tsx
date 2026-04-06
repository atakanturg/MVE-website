import { motion } from "framer-motion";
import { Link } from "wouter";
import { config } from "../config";
import { FinalistCard } from "../components/FinalistCard";

export function InvestmentSummitDetails() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto flex flex-col tracking-wide bg-transparent">

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <Link href="/investment-summit">
          <a className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all">
            <span>←</span> Investment Summit
          </a>
        </Link>
      </motion.div>

      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-heading tracking-tight leading-none uppercase font-heading">
          Event Details
        </h1>
      </motion.div>

      {/* How It Works */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-8 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" />
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { num: "01", title: "The Opens", body: "Students form teams and submit answers to specialized questions to qualify for the next round." },
            { num: "02", title: "Qualifiers", body: "Top teams build financial models supporting their investment thesis." },
            { num: "03", title: "Pitch Day", body: "Finalists pitch live to judges and compete for the grand prize." },
          ].map(({ num, title, body }) => (
            <motion.div
              key={num}
              variants={itemVariants}
              className={`pt-6 border-t border-[#7A92A8]/30`}
            >
              <div className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-3">{num}</div>
              <h3 className="text-heading font-bold text-lg mb-3 tracking-tight uppercase">{title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed font-light">{body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Finalist Teams */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-8 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" />
          Finalist Teams
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border-t border-[#7A92A8]/30 pt-6">
            <FinalistCard teamName={config.finalistTeams.team1} />
          </div>
          <div className="border-t border-[#7A92A8]/30 pt-6">
            <FinalistCard teamName={config.finalistTeams.team2} />
          </div>
          <div className="border-t border-[#7A92A8]/30 pt-6">
            <FinalistCard teamName={config.finalistTeams.team3} />
          </div>
          <div className="border-t border-[#7A92A8]/30 pt-6">
            <FinalistCard teamName={config.finalistTeams.team4} />
          </div>
        </div>
      </motion.section>

      {/* Awards */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-8 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" />
          Awards
        </h2>

        <div className="w-full max-w-2xl">
          {[
            { label: "1st Place", value: config.prizes.first, highlight: true },
            { label: "2nd Place", value: config.prizes.second, highlight: true },
            { label: "3rd Place", value: config.prizes.third, highlight: true },
            { label: "Best Financial Model", value: null, highlight: false },
            { label: "Best Q&A Performance", value: null, highlight: false },
          ].map(({ label, value, highlight }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className={`flex justify-between items-center py-4 border-b border-[#7A92A8]/20`}
            >
              <span className={`font-bold text-sm tracking-widest uppercase ${highlight ? "text-heading" : "text-foreground/60"}`}>
                {label}
              </span>
              {value && <span className="text-primary font-bold text-sm tracking-widest">{value}</span>}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
