import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SlideUpButton } from "@/components/SlideUpButton";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-sky-50 via-mint-50 to-peach-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-9xl mb-6"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😕
          </motion.div>

          <h1 className="special-font hero-heading text-berry-600 mb-4">
            4<b>0</b>4
          </h1>

          <p className="text-2xl md:text-3xl text-foreground/70 mb-6 font-display">
            Oups ! Cette page n'existe pas !
          </p>

          <p className="text-lg text-foreground/50 mb-8 max-w-md mx-auto">
            On dirait que tu t'es perdu dans la forêt de Junior Genie ! Ne t'inquiète pas,
            retournons vite vers les aventures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <SlideUpButton className="bg-berry-400 text-white hover:bg-berry-500">
                🏠 Retour à l'accueil
              </SlideUpButton>
            </Link>
            <Link to="/fairy-tales">
              <SlideUpButton className="bg-sky-400 text-white hover:bg-sky-500">
                🎭 Voir les histoires
              </SlideUpButton>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default NotFound;
