import { motion } from "framer-motion";

interface ContactCardProps {
  name: string;
  title: string;
  email: string;
}

export function ContactCard({ name, title, email }: ContactCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      className="bg-transparent border-t border-[#7A92A8]/20 pt-8 pb-4 flex flex-col items-start text-left shadow-none group"
    >
      <h3 className="font-bold text-xl text-heading tracking-widest uppercase mb-1">{name}</h3>
      <p className="text-foreground/60 text-xs tracking-widest uppercase mb-6">{title}</p>
      <a
        href={`mailto:${email}`}
        className="text-primary font-bold text-xs tracking-widest uppercase hover:gap-3 transition-all mt-auto flex items-center gap-2 border-b border-primary/20 hover:border-primary pb-px"
      >
        {email} <span className="text-base transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  );
}
