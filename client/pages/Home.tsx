import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { BentoTilt } from "@/components/BentoTilt";
import { SlideUpButton } from "@/components/SlideUpButton";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import videosData from "@/data/videos.json";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredVideos = videosData.videos.slice(0, 6);
  const clipRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // About section clip-path animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#clip .about-image", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });

      gsap.from("#clip .about-image", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <section className="relative h-dvh w-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-mint-50 to-peach-100" />

        {/* Floating emojis */}
        <motion.div
          className="absolute top-20 left-[10%] text-6xl md:text-8xl opacity-20 pointer-events-none"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ☁️
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-5xl md:text-7xl opacity-20 pointer-events-none"
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[25%] text-6xl md:text-8xl opacity-20 pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[10%] text-5xl md:text-7xl opacity-15 pointer-events-none"
          animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.3 }}
        >
          🌈
        </motion.div>

        {/* Hero content */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10 h-full flex flex-col justify-center">

            {/* Mascot */}
            <motion.div className="mb-8 relative w-fit"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Multi-layer glow */}
              {["#c084fc", "#f472b6", "#60a5fa"].map((color, i) => (
                <motion.div key={i}
                  className="absolute rounded-full blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${color}55, transparent)`, inset: `${-20 - i * 12}px` }}
                  animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3 + i * 0.1, 1] }}
                  transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}

              {/* Main mascot — animated star character */}
              <motion.div
                className="relative z-10 cursor-default select-none"
                animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.25, rotate: 0 }}
                style={{ width: 120, height: 120 }}
              >
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                  {/* Body */}
                  <motion.circle cx="60" cy="65" r="38" fill="url(#bodyGrad)"
                    animate={{ r: [38, 40, 38] }} transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Face glow */}
                  <circle cx="60" cy="58" r="28" fill="url(#faceGrad)" />
                  {/* Eyes */}
                  <motion.g style={{ transformOrigin: "50px 54px" }} animate={{ scaleY: [1, 0.15, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
                    <ellipse cx="50" cy="54" rx="5" ry="6" fill="#1e1b4b" />
                  </motion.g>
                  <motion.g style={{ transformOrigin: "70px 54px" }} animate={{ scaleY: [1, 0.15, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
                    <ellipse cx="70" cy="54" rx="5" ry="6" fill="#1e1b4b" />
                  </motion.g>
                  {/* Eye shine */}
                  <circle cx="52" cy="51" r="2" fill="white" />
                  <circle cx="72" cy="51" r="2" fill="white" />
                  {/* Smile */}
                  <path d="M50 64 Q60 74 70 64" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Cheeks */}
                  <circle cx="44" cy="62" r="6" fill="#f9a8d4" opacity="0.6" />
                  <circle cx="76" cy="62" r="6" fill="#f9a8d4" opacity="0.6" />
                  {/* Star on top */}
                  <motion.polygon
                    points="60,8 63,18 74,18 65,24 68,34 60,28 52,34 55,24 46,18 57,18"
                    fill="url(#starGrad)"
                    animate={{ rotate: [0, 20, 0, -20, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: "60px 21px" }}
                  />
                  {/* Arms */}
                  <motion.path d="M22 65 Q15 55 22 48" stroke="url(#bodyGrad)" strokeWidth="10" strokeLinecap="round" fill="none"
                    animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: "22px 65px" }}
                  />
                  <motion.path d="M98 65 Q105 55 98 48" stroke="url(#bodyGrad)" strokeWidth="10" strokeLinecap="round" fill="none"
                    animate={{ rotate: [10, -10, 10] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: "98px 65px" }}
                  />
                  {/* Legs */}
                  <rect x="48" y="100" width="10" height="16" rx="5" fill="url(#bodyGrad)" />
                  <rect x="62" y="100" width="10" height="16" rx="5" fill="url(#bodyGrad)" />
                  {/* Gradients */}
                  <defs>
                    <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                    <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </radialGradient>
                    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Orbiting emojis — full circular orbit */}
              {["✨", "⭐", "🌟", "🎀", "💫"].map((s, i) => {
                const angle = (i / 5) * Math.PI * 2;
                const r = 70;
                return (
                  <motion.span key={i}
                    className="absolute text-lg pointer-events-none select-none"
                    style={{ top: "50%", left: "50%", marginTop: -10, marginLeft: -10 }}
                    animate={{
                      x: [
                        Math.cos(angle) * r,
                        Math.cos(angle + Math.PI * 0.5) * r,
                        Math.cos(angle + Math.PI) * r,
                        Math.cos(angle + Math.PI * 1.5) * r,
                        Math.cos(angle + Math.PI * 2) * r,
                      ],
                      y: [
                        Math.sin(angle) * r,
                        Math.sin(angle + Math.PI * 0.5) * r,
                        Math.sin(angle + Math.PI) * r,
                        Math.sin(angle + Math.PI * 1.5) * r,
                        Math.sin(angle + Math.PI * 2) * r,
                      ],
                      opacity: [0.6, 1, 0.6, 1, 0.6],
                      scale: [0.8, 1.4, 0.8, 1.4, 0.8],
                    }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                  >{s}</motion.span>
                );
              })}
            </motion.div>

            {/* Heading — letter by letter */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="special-font hero-heading text-berry-600 relative">
                <motion.span
                  initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="inline-block"
                >
                  story
                </motion.span>
                <motion.b
                  initial={{ opacity: 0, y: -40, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-block"
                >
                  b
                </motion.b>
                <motion.span
                  initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="inline-block"
                >
                  erries
                </motion.span>
              </h1>
            </motion.div>

            {/* Animated badge */}
            <motion.div
              className="flex items-center gap-2 mt-3 mb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-green-600 uppercase tracking-widest font-general">En direct — Nouvelles histoires ajoutées !</span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mb-5 max-w-md font-general text-sm md:text-base text-foreground/70 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Contes de fées et vidéos éducatives pour les enfants <br />
              Plongez dans un monde magique d'histoires ! ✨
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { to: "/fairy-tales", label: "🎭 Contes", cls: "bg-berry-100 hover:bg-berry-200",   delay: 0.6 },
                { to: "/education",   label: "📚 Apprentissage",   cls: "bg-sky-100 hover:bg-sky-200",       delay: 0.72 },
                { to: "/games",       label: "🎮 Jeux",       cls: "bg-lavender-100 hover:bg-lavender-200", delay: 0.84 },
              ].map((btn) => (
                <motion.div key={btn.to}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: btn.delay, type: "spring", stiffness: 220 }}
                  whileHover={{ scale: 1.1, y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Link to={btn.to}>
                    <SlideUpButton className={btn.cls}>{btn.label}</SlideUpButton>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              className="flex gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { n: "50+", label: "Histoires" },
                { n: "30+", label: "Leçons" },
                { n: "6",   label: "Jeux" },
              ].map((s, i) => (
                <motion.div key={i} className="flex flex-col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1, type: "spring" }}
                >
                  <span className="text-2xl font-black text-berry-600 leading-none">{s.n}</span>
                  <span className="text-xs text-foreground/40 uppercase tracking-widest font-general">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-berry-400/50 flex items-start justify-center pt-1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-berry-400"
                  animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <motion.span
                className="text-xs text-foreground/40 font-general uppercase tracking-widest"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Défiler pour explorer
              </motion.span>
            </motion.div>

          </div>
        </div>

        {/* Hero bottom corner text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-berry-200/30">
          hist<b>o</b>ires
        </h1>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="min-h-screen w-screen">
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
          <p className="font-general text-sm uppercase md:text-[10px] text-foreground/60">
            Bienvenue chez Junior Genie
          </p>

          <AnimatedTitle
            title="V<b>i</b>vez la<br />magie des hist<b>o</b>ires"
            containerClass="mt-5 !text-berry-700 text-center"
          />

          <div className="about-subtext mt-4">
            <p className="text-foreground/80">
              Où chaque histoire est une aventure qui attend d'être découverte
            </p>
            <p className="text-foreground/50">
              Junior Genie vous propose des contes enchanteurs, du contenu éducatif
              et des jeux interactifs — tout conçu pour les jeunes esprits curieux
            </p>
          </div>
        </div>

        {/* Clip-path image reveal */}
        <div className="h-dvh w-screen" id="clip" ref={clipRef}>
          <div className="about-image mask-clip-path absolute left-1/2 top-0 z-20 h-[80vw] w-[80vw] -translate-x-1/2 overflow-hidden md:h-[80vh] md:w-[65vw]">
            {[
              "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
            ].map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="Junior Genie"
                className="absolute left-0 top-0 size-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 4,
                  repeatDelay: 28,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENTO CATEGORIES SECTION ========== */}
      <section className="bg-berry-900 pb-52">
        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-32">
            <p className="font-display text-lg text-berry-100">
              Explorez notre contenu
            </p>
            <p className="max-w-md font-display text-lg text-berry-100 opacity-50">
              Plongez dans notre collection magique de contes, vidéos éducatives
              et jeux interactifs. Trouvez le contenu parfait pour votre enfant.
            </p>
          </div>

          {/* Main featured card */}
          <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
            <div className="relative size-full cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=800&fit=crop"
                alt="Contes"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
                <div>
                  <h1 className="bento-title special-font">
                    C<b>o</b>ntes
                  </h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base text-white/80">
                    Des histoires enchanteresses qui éveillent l'imagination — de Cendrillon
                    au Petit Chaperon Rouge, des aventures intemporelles vous attendent.
                  </p>
                </div>
                <Link to="/fairy-tales">
                  <SlideUpButton className="bg-white/90 hover:bg-white text-berry-700 mt-4">
                    Regarder
                  </SlideUpButton>
                </Link>
              </div>
            </div>
          </BentoTilt>

          {/* Bento grid */}
          <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
            {/* Education - tall card */}
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <Link to="/education" className="relative size-full cursor-pointer block">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=800&fit=crop"
                  alt="Apprentissage"
                  className="absolute left-0 top-0 size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
                  <div>
                    <h1 className="bento-title special-font">
                      Appr<b>e</b>ntissage
                    </h1>
                    <p className="mt-3 max-w-64 text-xs md:text-base text-white/80">
                      Apprenez l'alphabet, les chiffres, les sciences et les valeurs morales avec des vidéos amusantes.
                    </p>
                  </div>
                </div>
              </Link>
            </BentoTilt>

            {/* Games */}
            <BentoTilt className="bento-tilt_1 row-span-1 ms-0 md:col-span-1 md:ms-0">
              <Link to="/games" className="relative size-full cursor-pointer block">
                <img
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
                  alt="Jeux"
                  className="absolute left-0 top-0 size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
                  <div>
                    <h1 className="bento-title special-font">
                      J<b>e</b>ux
                    </h1>
                    <p className="mt-3 max-w-64 text-xs md:text-base text-white/80">
                      Jeux de mémoire, quiz, puzzles alphabétiques et bien plus !
                    </p>
                  </div>
                </div>
              </Link>
            </BentoTilt>

            {/* Science */}
            <BentoTilt className="bento-tilt_1 me-0 md:col-span-1 md:me-0">
              <Link to="/education" className="relative size-full cursor-pointer block">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
                  alt="Science"
                  className="absolute left-0 top-0 size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
                  <div>
                    <h1 className="bento-title special-font">
                      Sci<b>e</b>nces
                    </h1>
                    <p className="mt-3 max-w-64 text-xs md:text-base text-white/80">
                      Dinosaures, système solaire, animaux marins et les merveilles de la nature.
                    </p>
                  </div>
                </div>
              </Link>
            </BentoTilt>

            {/* More content card */}
            <BentoTilt className="bento-tilt_2">
              <Link
                to="/fairy-tales"
                className="flex size-full flex-col justify-between bg-mint-300 p-5 cursor-pointer"
              >
                <h1 className="bento-title special-font max-w-64 text-berry-900">
                  Pl<b>u</b>s d'hist<b>o</b>ires
                </h1>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="m-5 scale-[5] self-end text-berry-700"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.368 19.102c.349 1.049 1.011 1.086 1.478.086l5.309-11.375c.467-1.002.034-1.434-.967-.967l-11.376 5.308c-1.001.467-.963 1.129.085 1.479l4.103 1.367 1.368 4.102z" />
                </svg>
              </Link>
            </BentoTilt>

            {/* Featured video thumbnail */}
            <BentoTilt className="bento-tilt_2">
              <div
                className="relative size-full cursor-pointer"
                onClick={() => handleVideoClick(featuredVideos[0])}
              >
                <img
                  src={featuredVideos[0]?.thumbnail}
                  alt={featuredVideos[0]?.title}
                  className="size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-2xl ml-1">▶</span>
                  </div>
                </div>
              </div>
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* ========== FEATURED VIDEOS SECTION ========== */}
      <section className="py-20 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedTitle
              title="✨ Vidéos<br />en V<b>e</b>dette ✨"
              containerClass="!text-berry-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <BentoTilt key={video.id} className="h-full">
                <VideoCard
                  {...video}
                  onClick={() => handleVideoClick(video)}
                />
              </BentoTilt>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link to="/fairy-tales">
              <SlideUpButton className="bg-gradient-to-r from-berry-400 via-lavender-400 to-sky-400 text-white hover:shadow-2xl">
                Voir toutes les vidéos 🎬
              </SlideUpButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== STORY / CTA SECTION ========== */}
      <section id="story" className="min-h-dvh w-screen bg-black text-berry-50 relative overflow-hidden">

        {/* Subtle dark orbs */}
        {[
          { color: "#7c3aed22", w: 600, h: 600, x: "-10%", y: "5%",  dur: 12 },
          { color: "#be185d18", w: 500, h: 500, x: "55%",  y: "45%", dur: 15 },
          { color: "#0891b218", w: 500, h: 500, x: "15%",  y: "55%", dur: 13 },
        ].map((o, i) => (
          <motion.div key={i} className="absolute rounded-full blur-[100px] pointer-events-none"
            style={{ width: o.w, height: o.h, left: o.x, top: o.y, background: o.color }}
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
          />
        ))}

        <div className="flex size-full flex-col items-center py-10 pb-24">

          <motion.p
            className="font-general text-sm uppercase md:text-[10px] text-berry-200"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            votre aventure commence ici
          </motion.p>

          <div className="relative size-full">
            <AnimatedTitle
              title="d<b>é</b>couvrez<br />des hist<b>o</b>ires sans fin"
              containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
            />

            <div className="story-img-container">
              <div className="story-img-mask">
                <div className="story-img-content relative" style={{ minHeight: 340 }}>
                  {[
                    "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=600&fit=crop",
                  ].map((src, i) => (
                    <motion.img key={src} src={src} alt="Histoires"
                      className="absolute left-0 top-0 w-full max-w-2xl mx-auto object-contain"
                      style={{ right: 0 }}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.04] }}
                      transition={{ duration: 5, repeat: Infinity, delay: i * 5, repeatDelay: 20, ease: "easeInOut" }}
                    />
                  ))}
                  <img src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=600&fit=crop"
                    alt="" className="w-full max-w-2xl mx-auto object-contain opacity-0" style={{ visibility: "hidden" }}
                  />
                </div>
              </div>

              {/* SVG filter for gooey effect */}
              <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="flt_tag">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                    <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

          <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
            <motion.div
              className="flex h-full w-fit flex-col items-center md:items-start"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.p
                className="mt-3 max-w-sm text-center font-display text-berry-100 md:text-start"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Plongez dans des histoires enchanteresses et des aventures éducatives.
                Explorez des contes, apprenez de nouvelles choses et jouez —
                tout dans un endroit magique.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/fairy-tales">
                  <SlideUpButton className="bg-berry-50 text-berry-700 mt-5 hover:bg-white">
                    Explorer
                  </SlideUpButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT / CTA SECTION ========== */}
      <section id="contact" className="my-20 min-h-96 w-screen px-4 sm:px-10">
        <motion.div
          className="relative rounded-2xl bg-berry-900 py-24 text-berry-50 overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Parallax floating elements */}
          <motion.div
            className="absolute top-10 left-10 text-6xl opacity-10 pointer-events-none"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            animate={{ y: [0, -20, 0] }}
          >📚</motion.div>

          <motion.div
            className="absolute bottom-10 right-10 text-6xl opacity-10 pointer-events-none"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            animate={{ rotate: [0, 360] }}
          >✨</motion.div>

          <motion.div
            className="absolute top-1/2 left-1/4 text-5xl opacity-5 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            animate={{ y: [0, 30, 0], rotate: [0, 20, 0] }}
          >🌟</motion.div>

          <motion.div
            className="absolute bottom-1/3 left-10 text-5xl opacity-5 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            animate={{ y: [0, -25, 0] }}
          >🎭</motion.div>

          <motion.div
            className="absolute top-1/3 right-16 text-5xl opacity-5 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            animate={{ rotate: [0, -360] }}
          >🎠</motion.div>

          <div className="flex flex-col items-center text-center relative z-10">
            <motion.p
              className="mb-10 font-general text-[10px] uppercase text-berry-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Commencez votre aventure
            </motion.p>

            <AnimatedTitle
              title="appr<b>e</b>nons et<br />gr<b>a</b>ndissons<br />ens<b>e</b>mble."
              containerClass="!text-berry-50"
            />

            {/* Animated stats row */}
            <motion.div
              className="flex gap-8 mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {[
                { value: "50+", label: "Contes" },
                { value: "30+", label: "Leçons" },
                { value: "6",   label: "Jeux" },
              ].map((stat, i) => (
                <motion.div key={i} className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15, type: "spring" }}
                >
                  <span className="text-3xl font-black text-berry-200">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-berry-400 font-semibold">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
            >
              <Link to="/fairy-tales">
                <SlideUpButton className="bg-berry-50 text-berry-700 mt-6 hover:bg-white">
                  Commencer
                </SlideUpButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};
