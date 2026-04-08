import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  video: {
    id: number;
    title: string;
    videoUrl: string;
    description: string;
  } | null;
  onClose: () => void;
}

export const VideoModal = ({ isOpen, video, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);

  // Reload video every time a new video opens
  useEffect(() => {
    if (!isOpen || !video) return;
    setError(false);
    setIsPlaying(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.load();
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isOpen, video?.id]);

  // Pause & reset when closed
  useEffect(() => {
    if (!isOpen) {
      const v = videoRef.current;
      if (v) { v.pause(); v.currentTime = 0; }
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-gray-950 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all hover:scale-110 hover:rotate-90 duration-300"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video */}
            <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
              {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-3">
                  <span className="text-4xl">😢</span>
                  <p className="text-sm">Video unavailable</p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain"
                  src={video.videoUrl}
                  controls
                  playsInline
                  controlsList="nodownload"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setError(true)}
                  style={{ background: "#000" }}
                />
              )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 special-font line-clamp-2">
                {video.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                {video.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-berry-500 hover:bg-berry-600 text-white text-xs font-bold transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all hover:scale-105"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all hover:scale-105 ml-auto"
                >
                  <Maximize className="w-3 h-3" />
                  Fullscreen
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
