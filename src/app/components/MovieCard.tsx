import { Star } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  genre: string;
}

export function MovieCard({ id, title, poster, rating, genre }: MovieCardProps) {
  return (
    <Link to={`/movie/${id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-2xl overflow-hidden border border-border"
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-1 line-clamp-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{genre}</p>
          <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 rounded-lg transition-all">
            Book Now
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
