import { motion } from "framer-motion";
import { Link } from "wouter";

const presentations = [
  {
    names: "Karim Ghandour '29, Sidney Schwartz '29 & Dylan Kantesaria '29",
    id: "freshmen",
    classYear: "Class of 2029",
    title: "AI in Scientific Discovery",
    description: "An analysis of the current landscape of Artificial Intelligence and its active role in scientific discovery. The presentation explored the core thesis that AI is generating solutions to problems humans have not even begun to ask. By examining chemical engineering, bioscience, and energy, the group highlighted ongoing developments in the creation of new materials, protein fold technology, and nuclear fission."
  },
  {
    names: "Atakan Turgut '28",
    id: "atakan",
    classYear: "Class of 2028",
    title: "Neuromorphic Computing & Energy",
    description: "A presentation proposing a vital solution to the critical global challenge of advancing AI while securing our energy supply. Highlighting how geopolitical conflicts in pipeline regions cause extreme volatility in natural gas and oil, Atakan emphasized that current renewable and nuclear infrastructure cannot keep pace with AI's massive energy demands. To resolve this growing crisis, he proposed the widespread adoption of neuromorphic computing. By utilizing AI chips that emulate brain efficiency via spiking neural networks, this solution offers a viable path to advance technology while maintaining affordable global power."
  },
  {
    names: "Gabriel Karsenti '26",
    id: "gabriel",
    classYear: "Class of 2026",
    title: "SafeGuard Marine Technology",
    description: "A journey into the development of SafeGuard, an advanced guard for boat motors and propellers designed to prevent marine life strikes and tragic human incidents. Inspired by the tragedy involving Ella Adler, Gabriel discovered that existing guards are either permanently fixed, impractical for everyday use, or entirely ineffective. Through extensive development alongside professors at Duke University, Gabriel is approaching the completion of his design with plans to license the patent to major retailers, ensuring widespread availability and preventing future tragedies."
  },
  {
    names: "Wes Griffin '26",
    id: "wes",
    classYear: "Class of 2026",
    title: "Data Optimization at Flapping Airplanes",
    description: "A presentation on the critical data bottleneck in modern AI training. As models consume immense amounts of data, the industry risks exhausting the entire web's usable data supply if current growth rates continue. Wes and the team at the startup Flapping Airplanes are actively researching methods to train large AI models using significantly fewer tokens, all while maintaining or exceeding the same profound level of proficiency and output depth."
  }
];

export function SfereRecentKeynotes() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40, filter: "blur(4px)" },
    visible: (idx: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.1 + idx * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <div className="flex flex-col min-h-screen tracking-wide bg-transparent relative pt-4 md:pt-8 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-28 left-6 md:left-12 z-40 pointer-events-auto"
      >
        <Link href="/sfere">
          <a className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all">
            <span>←</span> SFERE
          </a>
        </Link>
      </motion.div>

      <section className="pt-40 pb-20 px-6 md:px-12 flex flex-col justify-center w-full">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 max-w-3xl"
          >
            <h2 className="text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3">Highlighted Students</h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-widest font-heading uppercase mb-6 leading-tight">
              Recent Presentations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore the innovative research, technological solutions, and entrepreneurial ventures presented by our distinguished student keynote speakers.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-10 w-full mb-32 z-10"
          >
            {presentations.map((pres, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={itemVariants}
                className="flex flex-col bg-transparent border-t border-[#7A92A8]/30 pt-16 pb-12 rounded-none group pointer-events-auto shadow-none"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2 border-b border-border/50 pb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-heading group-hover:text-primary font-heading tracking-wide uppercase transition-colors">{pres.names}</h3>
                  <span className="text-primary group-hover:text-heading font-bold text-sm tracking-widest uppercase shrink-0 transition-colors">{pres.classYear}</span>
                </div>

                <h4 className="text-xl font-serif font-bold text-foreground group-hover:text-primary mb-4 uppercase tracking-widest transition-colors">{pres.title}</h4>
                <p className="text-base text-foreground/80 group-hover:text-foreground leading-relaxed font-light mb-8 grow transition-colors">
                  {pres.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto border-t border-border/50 pt-6 relative z-50">
                  <Link href={`/contact/keynotes/${pres.id}`}>
                    <a 
                      className="inline-flex items-center gap-3 border-b-2 border-primary text-primary hover:border-heading hover:text-heading transition-all duration-300 rounded-none cursor-pointer select-none font-black tracking-widest uppercase py-1 hover:pl-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                      Contact Presenter{pres.id === "freshmen" ? "s" : ""}
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
