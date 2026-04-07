import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const SPEAKER_CONFIG = {
  "freshmen": {
    name: "the Freshmen Group",
    description: "Send a message to Karim, Sidney, and Dylan regarding their research on AI in Scientific Discovery.",
    emails: "29kghandour@ransomeverglades.org, 29sschwartz@ransomeverglades.org, 29dkantesaria@ransomeverglades.org"
  },
  "atakan": {
    name: "Atakan Turgut",
    description: "Send a message to Atakan regarding his presentation on Neuromorphic Computing & Energy.",
    emails: "28aturgut@ransomeverglades.org"
  },
  "gabriel": {
    name: "Gabriel Karsenti",
    description: "Send a message to Gabriel regarding his presentation on SafeGuard Marine Technology.",
    emails: "26gkarsenti@ransomeverglades.org"
  },
  "wes": {
    name: "Wes Griffin",
    description: "Send a message to Wes regarding his presentation on Data Optimization at Flapping Airplanes.",
    emails: "26wgriffin@ransomeverglades.org"
  }
} as const;

type SpeakerId = keyof typeof SPEAKER_CONFIG;

export function HiddenContact({ params }: { params: { id: string } }) {
  const speakerId = params.id as SpeakerId;
  const config = SPEAKER_CONFIG[speakerId];

  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!config) {
    return (
      <div className="flex flex-col min-h-[50vh] items-center justify-center p-8 bg-transparent">
        <h1 className="text-2xl text-heading font-bold font-heading uppercase tracking-widest mb-4">Contact Not Found</h1>
        <Link href="/sfere/recent-keynotes">
          <a className="text-primary hover:underline border-b border-transparent hover:border-primary pb-1">Return to Keynotes</a>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message || !subject) return;

    setStatus("sending");

    emailjs.send(
      "service_yk9lrx7",
      "template_ogig5pc",
      {
        to_email: config.emails,
        reply_to: senderEmail,
        subject: subject,
        message: message
      },
      "gQjuxqPH6b11Y1Xe3"
    ).then(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setSenderEmail("");
        setSubject("");
        setMessage("");
      }, 4000);
    }).catch((err) => {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    });
  };

  return (
    <div className="flex flex-col min-h-screen tracking-wide bg-transparent relative pt-4 md:pt-8 w-full pointer-events-auto">
      {/* Back Link to Specific Location */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-28 left-6 md:left-12 z-40 pointer-events-auto"
      >
        <Link href="/sfere/recent-keynotes">
          <a className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all">
            <span>←</span> Back to Keynotes
          </a>
        </Link>
      </motion.div>

      <section className="py-32 bg-transparent min-h-[90vh] flex flex-col justify-center items-center w-full px-6">
        <div className="mx-auto max-w-3xl relative z-10 w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3 text-center w-full block">SFERE Presenter</h2>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground tracking-[0.1em] font-heading uppercase text-center w-full block break-words">
              Contact {config.name}
            </h1>
          </motion.div>

          {/* Email Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-transparent border-t border-[#7A92A8]/20 flex flex-col items-center p-8 md:p-12 rounded-none mt-20">
              <h3 className="text-xl md:text-2xl font-bold text-heading font-heading tracking-wide uppercase mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                {config.description}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="senderEmail" className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Your Email
                  </label>
                  <input
                    id="senderEmail"
                    name="reply_to"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-transparent border-b border-[#7A92A8]/30 text-foreground px-4 py-3 text-sm rounded-none focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Subject / Title
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Message Title"
                    className="bg-transparent border-b border-[#7A92A8]/30 text-foreground px-4 py-3 text-sm rounded-none focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="messageBody" className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Message
                  </label>
                  <textarea
                    id="messageBody"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows={6}
                    className="bg-transparent border-b border-[#7A92A8]/30 text-foreground px-4 py-3 text-sm rounded-none focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start inline-flex items-center gap-3 border-b-2 border-primary bg-transparent text-primary hover:border-heading hover:text-heading transition-all duration-300 rounded-none cursor-pointer disabled:opacity-50 font-black tracking-widest uppercase py-2 hover:pl-4"
                >
                  {status === "sending" ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : status === "sent" ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Message Sent
                    </>
                  ) : status === "error" ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      Error Sending
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
