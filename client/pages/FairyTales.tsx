import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { BentoTilt } from "@/components/BentoTilt";
import { SlideUpButton } from "@/components/SlideUpButton";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import videosData from "@/data/videos.json";
import { useState } from "react";
import { motion } from "framer-motion";

export const FairyTales = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const fairyTaleVideos = videosData.videos.filter(
    (v) => v.category === "fairy-tales"
  );

  const filteredVideos =
    filter === "all"
      ? fairyTaleVideos
      : fairyTaleVideos.filter((v) => v.subcategory === filter);

  const categories = [
    { id: "all", label: "Toutes les histoires", emoji: "🌟" },
    { id: "classic", label: "Contes classiques", emoji: "👑" },
    { id: "adventure", label: "Aventures", emoji: "🗺️" },
  ];

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-berry-300 via-peach-300 to-sky-300 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 text-8xl opacity-20 pointer-events-none"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          👑
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedTitle
            title="🎭 C<b>o</b>ntes<br />& H<b>i</b>stoires"
            containerClass="!text-white drop-shadow-lg"
          />
          <p className="text-xl md:text-2xl text-white/80 text-center mt-4 font-general text-sm uppercase">
            Explorez des mondes magiques et des aventures intemporelles !
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-xl sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  filter === cat.id
                    ? "bg-berry-500 text-white shadow-lg scale-105"
                    : "bg-white text-berry-600 hover:bg-berry-50 shadow-md hover:scale-105"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20 bg-gradient-to-b from-peach-50 via-sky-50 to-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={filter}
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
              <div className="text-6xl mb-4">😢</div>
              <p className="text-2xl text-foreground/50">
                Aucune histoire trouvée dans cette catégorie !
              </p>
            </div>
          )}
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
