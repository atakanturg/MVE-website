interface SubmissionButtonProps {
  label: string;
  url: string;
  variant: "solid" | "outline" | "neutral";
  isNext?: boolean;
}

export function SubmissionButton({ label, url, variant, isNext = false }: SubmissionButtonProps) {
  const isDisabled = !url || url.trim() === "";

  const base = "block w-full text-left py-4 px-2 font-black tracking-widest uppercase text-sm transition-all duration-300 flex items-center justify-between gap-4 border-b";
  let classes = "";

  if (isNext) {
    classes = "bg-transparent text-primary border-primary/40 hover:border-primary hover:pl-4";
  } else if (isDisabled) {
    classes = "bg-transparent text-muted-foreground/30 border-muted-foreground/10 cursor-not-allowed";
  } else {
    if (variant === "solid") {
      classes = "bg-transparent text-primary font-black border-primary/40 hover:border-primary hover:pl-4 cursor-pointer";
    } else if (variant === "outline") {
      classes = "bg-transparent text-primary/80 border-[#7A92A8]/20 hover:border-primary hover:text-primary hover:pl-4 cursor-pointer";
    } else {
      classes = "bg-transparent text-foreground/70 border-[#7A92A8]/10 hover:border-[#7A92A8]/40 hover:pl-4 cursor-pointer";
    }
  }

  const inner = (
    <>
      <span>{label}</span>
      <span className={`text-base ${isDisabled && !isNext ? "opacity-20" : ""}`}>
        {isNext ? "→" : isDisabled ? "/" : "↗"}
      </span>
    </>
  );

  if (isDisabled && !isNext) {
    return <button disabled className={`${base} ${classes}`}>{inner}</button>;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${classes}`}>
      {inner}
    </a>
  );
}
