export function Home() {
  // We add a large height and pointer-events-none so the document is scrollable
  // but doesn't block the WebGL Canvas. ScrollControls will listen on document.body.
  return <div className="h-[550vh] pointer-events-none bg-transparent" />;
}
