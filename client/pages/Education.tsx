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
  const [isModalOpen, setIsModalOpen] = useState(false);  const educationVideos = videosData.videos.filter(
    (v) => v.category === "education" && v.subcategory === "alphabet"
  );

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
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

      {/* Category Tabs - removed */}

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-lavender-50 via-sky-50 to-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Videos Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {educationVideos.map((video) => (
              <BentoTilt key={video.id} className="h-full">
                <VideoCard
                  {...video}
                  onClick={() => handleVideoClick(video)}
                />
              </BentoTilt>
            ))}
          </motion.div>

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
