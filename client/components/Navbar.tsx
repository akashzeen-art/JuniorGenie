import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SlideUpButton } from "./SlideUpButton";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const navItems = [
    { label: "Accueil",       path: "/",           emoji: "🏠" },
    { label: "Contes",        path: "/fairy-tales", emoji: "🎭" },
    { label: "Apprentissage", path: "/education",   emoji: "📚" },
    { label: "Jeux",          path: "/games",       emoji: "🎮" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsVisible(true); setHasScrolled(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); setHasScrolled(true);
      } else {
        setIsVisible(true); setHasScrolled(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, { y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0, duration: 0.2 });
    }
  }, [isVisible]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header
          className={`absolute top-1/2 w-full -translate-y-1/2 transition-all duration-500 ${
            hasScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg rounded-full border border-berry-200/30" : ""
          }`}
        >
          <nav className="flex size-full items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src="/image.png" alt="Junior Genie" className="h-16 sm:h-20 w-auto object-contain drop-shadow-lg" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}
                  className={`nav-hover-btn ${
                    location.pathname === item.path ? "text-berry-600" : "text-foreground/80 hover:text-berry-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/fairy-tales" className="hidden md:block">
                <SlideUpButton className="bg-berry-50 hover:bg-berry-100">
                  Découvrir
                </SlideUpButton>
              </Link>

              {/* Burger button */}
              <button
                className="flex md:hidden flex-col justify-center items-center w-12 h-12 rounded-full bg-berry-100 hover:bg-berry-200 transition-colors gap-[5px]"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block h-[3px] w-6 bg-berry-700 rounded-full origin-center"
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-[3px] w-6 bg-berry-700 rounded-full"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[3px] w-6 bg-berry-700 rounded-full origin-center"
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-berry-100">
                <div className="flex items-center">
                  <img src="/image.png" alt="Junior Genie" className="h-16 w-auto object-contain" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-berry-100 flex items-center justify-center text-berry-600 hover:bg-berry-200 transition-colors text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-4 py-6 gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-berry-100 text-berry-600 shadow-sm"
                          : "text-foreground/70 hover:bg-berry-50 hover:text-berry-600"
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span>{item.label}</span>
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-berry-500"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="px-6 py-6 border-t border-berry-100">
                <Link to="/fairy-tales" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-berry-400 to-lavender-400 text-white font-bold text-sm uppercase tracking-widest shadow-lg"
                  >
                    🎭 Commencer l'aventure
                  </motion.button>
                </Link>
                <p className="text-center text-xs text-foreground/30 mt-3 font-general uppercase tracking-widest">
                  Des histoires magiques pour les enfants
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
