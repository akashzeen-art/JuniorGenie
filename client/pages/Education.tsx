import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { BentoTilt } from "@/components/BentoTilt";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import videosData from "@/data/videos.json";
import { useState } from "react";
import { motion } from "framer-motion";

export const Education = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("alphabet");

  const educationVideos = videosData.videos.filter(
    (v) => v.category === "education"
  );

  const categories = [
    { id: "alphabet", label: "Alphabet", emoji: "🔤" },
    { id: "numbers", label: "Chiffres", emoji: "🔢" },
    { id: "science", label: "Sciences", emoji: "🔬" },
    { id: "moral", label: "Histoires morales", emoji: "💝" },
  ];

  const filteredVideos = educationVideos.filter(
    (v) => v.subcategory === activeCategory
  );

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const categoryDescriptions: Record<string, string> = {
    alphabet: "🔤 Apprenez l'alphabet avec des visuels amusants !",
    numbers: "🔢 Comptez et apprenez les chiffres de façon ludique !",
    science: "🔬 Découvrez les merveilles des sciences !",
    moral: "💝 Apprenez des valeurs et des leçons importantes !",
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-sky-300 via-lavender-300 to-mint-300 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-8xl opacity-20 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-8xl opacity-20 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          🧠
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedTitle
            title="📖 Vid<b>é</b>os<br />Éducat<b>i</b>ves"
            containerClass="!text-white drop-shadow-lg"
          />
          <p className="text-center mt-4 font-general text-sm uppercase text-white/80">
            Apprenez et grandissez avec notre contenu éducatif !
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white/80 backdrop-blur-xl sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-sky-500 text-white shadow-lg scale-105"
                    : "bg-white text-sky-600 hover:bg-sky-50 shadow-md hover:scale-105"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-lavender-50 via-sky-50 to-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Description */}
          <motion.div
            key={`desc-${activeCategory}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-block bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-md">
              <p className="text-lg text-foreground/70 font-semibold">
                {categoryDescriptions[activeCategory]}
              </p>
            </div>
          </motion.div>

          {/* Videos Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredVideos.map((video) => (
              <BentoTilt key={video.id} className="h-full">
                <VideoCard
                  {...video}
                  onClick={() => handleVideoClick(video)}
                />
              </BentoTilt>
            ))}
          </motion.div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤔</div>
              <p className="text-2xl text-foreground/50">
                Aucune vidéo dans cette catégorie pour l'instant !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Conseils d'Apprentissage */}
      <section className="py-20 bg-gradient-to-r from-lavender-100 via-sky-100 to-mint-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTitle
            title="💡 Cons<b>e</b>ils d'Apprentissage"
            containerClass="!text-lavender-600 mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "👀", title: "Regardez attentivement", desc: "Faites attention à chaque détail !" },
              { emoji: "✋", title: "Pratiquez", desc: "Essayez ce que vous avez appris !" },
              { emoji: "🔄", title: "Répétez", desc: "Regardez encore pour mieux apprendre !" },
            ].map((tip, i) => (
              <BentoTilt key={i} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-5xl mb-3">{tip.emoji}</div>
                <h3 className="text-2xl font-bold text-sky-600 mb-2">{tip.title}</h3>
                <p className="text-foreground/60">{tip.desc}</p>
              </BentoTilt>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};
