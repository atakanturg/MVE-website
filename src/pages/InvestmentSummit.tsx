import { motion } from "framer-motion";
import { Link } from "wouter";
import { config } from "../config";
import { TimelineRow } from "../components/TimelineRow";
import { SubmissionButton } from "../components/SubmissionButton";

export function InvestmentSummit() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen relative bg-transparent overflow-hidden flex flex-col pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto tracking-wide pointer-events-auto">

      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
        >
          <span>←</span> Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 1.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
        className="flex flex-col mb-16"
      >
        <h1 className="font-extrabold text-[clamp(2rem,8vw,5.5rem)] leading-none tracking-tight text-primary font-heading w-full text-left uppercase">
          {"INVESTMENT SUMMIT".split('').map((char, index) => (
            <span key={index} className="transition-colors duration-300 cursor-default pointer-events-auto inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row md:items-center gap-6 mt-8"
        >
          <p className="text-foreground/70 text-sm font-bold tracking-[0.2em] uppercase">
            Founded by Atakan Turgut & Patrick McDevitt
          </p>
          <Link 
            href="/investment-summit/details"
            className="inline-flex items-center gap-3 text-primary font-black text-xs tracking-[0.25em] uppercase hover:gap-5 transition-all duration-200"
          >
            Event Details <span className="text-base">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-32"
      >
        {/* Timeline */}
        <section>
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-10 flex items-center gap-3">
            Timeline
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <TimelineRow milestone="Opens / Applications Due" date={config.timeline.opensDeadline} />
            <TimelineRow milestone="Qualifiers / Deliverables Due" date={config.timeline.qualifiersDeadline} />
            <TimelineRow milestone="Finalists Announced" date={config.timeline.finalistsAnnounced} />
            <TimelineRow milestone="Pitch Day" date={config.timeline.pitchDay} isLast />
          </motion.div>
        </section>

        {/* Submissions */}
        <section>
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-10 flex items-center gap-3">
            Submissions
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            <SubmissionButton label="Opens Round Submissions" url={config.submissionUrls.opens} variant="solid" isNext={!!config.submissionUrls.opens && !config.submissionUrls.qualifiers} />
            <SubmissionButton label="Qualifiers Round Presentations" url={config.submissionUrls.qualifiers} variant="outline" isNext={!!config.submissionUrls.qualifiers && !config.submissionUrls.finalists} />
            <SubmissionButton label="Finalist Presentations" url={config.submissionUrls.finalists} variant="neutral" isNext={!!config.submissionUrls.finalists && !config.submissionUrls.voting} />
            <SubmissionButton label="Voting Procedure" url={config.submissionUrls.voting} variant="neutral" />
          </motion.div>
          {(!config.submissionUrls.opens || !config.submissionUrls.qualifiers || !config.submissionUrls.finalists) && (
            <p className="mt-5 text-[10px] font-black tracking-[0.25em] uppercase text-foreground/60 border-l-2 border-primary/30 pl-3">
              Links activate as rounds open.
            </p>
          )}
        </section>
      </motion.div>
    </div>
  );
}
