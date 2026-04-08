import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const EMOJIS = ["🫐", "🦄", "🌟", "🧚", "🌈", "🍭", "🎠", "✨", "🎡", "🌸", "🦋", "🔮"];
const TITLE = "Junior Genie";
const LETTER_COLORS = ["#ff6eb4","#ff9a3c","#ffe44d","#6ef472","#4dc8ff","#b06eff","#ff6eb4","#ff9a3c","#ffe44d","#6ef472","#4dc8ff","#b06eff"];
const MESSAGES = ["Collecte de la poussière de fée...","Ouverture du livre d'histoires...","Réveil des personnages...","Peinture de mondes magiques...","Presque prêt à explorer !"];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const doneRef = useRef(false);

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ff6eb4","#b06eff","#4dc8ff","#ffe44d","#6ef472","#ff9a3c","#ffffff"];

    const particles = [...Array(120)].map(() => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.7, -0.15),
      size: rand(2, 5),
      color: colors[Math.floor(rand(0, colors.length))],
      alpha: rand(0.4, 1),
      life: rand(0, 1),
      maxLife: rand(0.5, 1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.life += 0.005;
        if (p.life > p.maxLife) {
          p.x = rand(0, canvas.width);
          p.y = canvas.height + 10;
          p.life = 0;
        }
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        const a = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        ctx.save();
        ctx.globalAlpha = a * p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress + timers
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + rand(0.8, 2.0);
        if (next >= 100) {
          clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(onComplete, 600);
          }
          return 100;
        }
        return next;
      });
    }, 150);

    const emojiCycle = setInterval(() => setEmojiIndex((p) => (p + 1) % EMOJIS.length), 650);
    const msgCycle = setInterval(() => setMsgIndex((p) => (p + 1) % MESSAGES.length), 1600);

    const timeout = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setProgress(100);
        setTimeout(onComplete, 600);
      }
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(emojiCycle);
      clearInterval(msgCycle);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Orbiting dots positions
  const orbitDots = [...Array(8)].map((_, i) => {
    const angle = (i / 8) * 2 * Math.PI;
    const r = 56;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, color: LETTER_COLORS[i % LETTER_COLORS.length] };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* Layer 0: Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="https://vz-2c7aef55-281.b-cdn.net/f407fbdf-ada7-4940-a9c6-55b9a6c93627/play_480p.mp4" type="video/mp4" />
      </video>

      {/* Layer 1: Dark overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(8,0,20,0.45)" }} />

      {/* Layer 2: Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Layer 3: Shooting stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={`shoot-${i}`}
          className="absolute pointer-events-none"
          style={{ top: `${8 + i * 16}%`, left: 0, height: 2, borderRadius: 2,
            background: "linear-gradient(90deg, transparent, #fff, #a78bfa, transparent)",
            boxShadow: "0 0 6px #a78bfa", zIndex: 3 }}
          animate={{ x: ["-5vw", "110vw"], width: [0, 160, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 1.5, ease: "easeIn" }}
        />
      ))}

      {/* Layer 3: Floating emojis */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={`float-${i}`}
          className="absolute pointer-events-none select-none"
          style={{ left: `${6 + (i * 9) % 84}%`, fontSize: 20 + (i % 4) * 8, zIndex: 3,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}
          animate={{ y: ["108vh", "-15vh"], opacity: [0, 0.9, 0.9, 0], rotate: [-20, 20, -15, 15] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        >
          {EMOJIS[i % EMOJIS.length]}
        </motion.div>
      ))}

      {/* Layer 10: Main content */}
      <div className="relative flex flex-col items-center gap-7" style={{ zIndex: 10 }}>

        {/* Orb with spinning rings */}
        <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>

          {/* Spinning rings */}
          {[
            { size: 196, dur: 3,   dir: 1,  grad: "conic-gradient(from 0deg,   #f472b6,#818cf8,#34d399,#fbbf24,#f472b6)", pad: 3 },
            { size: 164, dur: 5,   dir: -1, grad: "conic-gradient(from 90deg,  #34d399,#60a5fa,#f472b6,#fbbf24,#34d399)", pad: 2 },
            { size: 134, dur: 7,   dir: 1,  grad: "conic-gradient(from 180deg, #fbbf24,#f472b6,#818cf8,#34d399,#fbbf24)", pad: 2 },
            { size: 106, dur: 4.5, dir: -1, grad: "conic-gradient(from 270deg, #60a5fa,#fbbf24,#f472b6,#818cf8,#60a5fa)", pad: 2 },
          ].map((ring, i) => (
            <motion.div key={`ring-${i}`}
              className="absolute rounded-full"
              style={{ width: ring.size, height: ring.size, background: ring.grad, padding: ring.pad,
                top: (200 - ring.size) / 2, left: (200 - ring.size) / 2,
                boxShadow: `0 0 ${16 + i * 6}px rgba(167,139,250,0.25)` }}
              animate={{ rotate: ring.dir === 1 ? 360 : -360 }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full" style={{ background: "#080014" }} />
            </motion.div>
          ))}

          {/* Orbiting dots — fixed positions using translateX/Y */}
          {orbitDots.map((dot, i) => (
            <motion.div key={`odot-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{ width: 8, height: 8, background: dot.color,
                boxShadow: `0 0 8px ${dot.color}`,
                top: "50%", left: "50%",
                marginTop: -4, marginLeft: -4,
                translateX: dot.x, translateY: dot.y }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}

          {/* Inner glow */}
          {[80, 60, 40].map((size, i) => (
            <motion.div key={`glow-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{ width: size, height: size, top: (200 - size) / 2, left: (200 - size) / 2,
                background: `radial-gradient(circle, ${["#c084fc66","#60a5fa44","#34d39933"][i]}, transparent)` }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          {/* Central emoji */}
          <AnimatePresence mode="wait">
            <motion.div key={emojiIndex}
              className="absolute flex items-center justify-center"
              style={{ fontSize: 60, zIndex: 5, filter: "drop-shadow(0 0 16px rgba(255,255,255,0.8))" }}
              initial={{ scale: 0, rotate: -120, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 120, opacity: 0 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 180, damping: 14 }}
            >
              {EMOJIS[emojiIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Title */}
        <motion.div className="flex" style={{ gap: 2 }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
        >
          {TITLE.split("").map((char, i) => (
            <motion.span key={i} className="font-black select-none"
              style={{ fontSize: "clamp(28px, 5vw, 52px)", color: LETTER_COLORS[i],
                textShadow: `0 0 16px ${LETTER_COLORS[i]}cc, 0 0 40px ${LETTER_COLORS[i]}55`,
                display: "inline-block" }}
              animate={{ y: [0, -16, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Cycling message */}
        <div style={{ height: 36 }} className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={msgIndex}
              className="relative overflow-hidden rounded-full px-5 py-1.5"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative text-white/70 text-xs font-semibold tracking-[0.18em] uppercase">
                ✦ {MESSAGES[msgIndex]} ✦
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bars */}
        <div className="flex flex-col items-center gap-2" style={{ width: 300 }}>
          {/* Segmented bar */}
          <div className="w-full flex gap-1">
            {[...Array(20)].map((_, i) => {
              const fill = Math.min(1, Math.max(0, (progress / 100) * 20 - i));
              return (
                <div key={i} className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: LETTER_COLORS[i % LETTER_COLORS.length],
                      boxShadow: fill > 0 ? `0 0 6px ${LETTER_COLORS[i % LETTER_COLORS.length]}` : "none" }}
                    animate={{ width: `${fill * 100}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              );
            })}
          </div>

          {/* Glow bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full relative overflow-hidden"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
              style={{ background: "linear-gradient(90deg,#f472b6,#a78bfa,#60a5fa,#34d399,#fbbf24)",
                boxShadow: "0 0 16px #a78bfa88" }}
            >
              <motion.div className="absolute inset-0 bg-white/25" style={{ width: "30%" }}
                animate={{ x: ["-100%", "450%"] }} transition={{ duration: 1.6, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Label */}
          <div className="flex items-center gap-3 mt-1">
            <motion.span className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
            >
              Chargement en cours
            </motion.span>
            <span className="text-sm font-black tabular-nums"
              style={{ color: "#c084fc", textShadow: "0 0 10px #c084fc" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Bouncing dots */}
        <div className="flex gap-2 items-end" style={{ height: 32 }}>
          {["#f472b6","#fb923c","#facc15","#4ade80","#60a5fa","#a78bfa","#f472b6"].map((color, i) => (
            <motion.div key={i} className="rounded-full"
              style={{ width: 9, height: 9, background: color, boxShadow: `0 0 10px ${color}` }}
              animate={{ y: [0, -18, 0], scale: [1, 1.6, 1] }}
              transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
