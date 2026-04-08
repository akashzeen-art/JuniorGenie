import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCardProps {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  onClick: () => void;
}

export const VideoCard = ({
  title,
  thumbnail,
  duration,
  description,
  onClick,
}: VideoCardProps) => {
  return (
    <div
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-mint-200 to-sky-200">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
            <div className="bg-gradient-to-br from-berry-400 to-berry-600 rounded-full p-4 shadow-2xl">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur">
            ⏱️ {duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-berry-700 line-clamp-2 group-hover:text-berry-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-2 mt-2 flex-1">
            {description}
          </p>

          <div className="mt-3 w-full bg-gradient-to-r from-berry-400 to-mint-400 text-white font-bold py-3 px-4 rounded-xl text-center text-sm transition-all duration-300 group-hover:from-berry-500 group-hover:to-mint-500 group-hover:shadow-lg">
            Regarder 🎬
          </div>
        </div>
      </div>
    </div>
  );
};
