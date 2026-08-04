export default function PremiumBackground() {
  return (
    <>
      {/* Global Premium Aurora Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/15 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[70%] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/10 blur-[120px] mix-blend-screen" />
      </div>
      
      {/* Subtle Technical Grid Overlay (Inspired by Carry) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay" style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: `48px 48px`,
        maskImage: `radial-gradient(ellipse 90% 90% at 50% 10%, black 10%, transparent 80%)`,
        WebkitMaskImage: `radial-gradient(ellipse 90% 90% at 50% 10%, black 10%, transparent 80%)`
      }} />

      {/* Tactile Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-difference" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </>
  );
}
