import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Star, Clock, Globe, Calendar, User } from "lucide-react";
import { movies } from "../data/movies";
import { Button } from "../components/ui/button";

export function MovieDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-96">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl mb-3" style={{ fontWeight: 700 }}>
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {movie.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {movie.language}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-md mx-auto px-6 pb-24">
        {/* Genre Pills */}
        <div className="flex gap-2 mb-6">
          {movie.genre.split(", ").map((genre) => (
            <span
              key={genre}
              className="px-4 py-1.5 bg-card border border-border rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl mb-3" style={{ fontWeight: 600 }}>
            Synopsis
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Release Date */}
        <div className="mb-6 bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Release Date</p>
              <p style={{ fontWeight: 600 }}>{movie.releaseDate}</p>
            </div>
          </div>
        </div>

        {/* Cast & Crew */}
        <div className="mb-6">
          <h2 className="text-xl mb-3" style={{ fontWeight: 600 }}>
            Cast & Crew
          </h2>
          <div className="bg-card border border-border rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Director</p>
                <p style={{ fontWeight: 600 }}>{movie.director}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {movie.cast.map((actor) => (
              <div
                key={actor}
                className="bg-card border border-border rounded-2xl px-4 py-3 whitespace-nowrap"
              >
                {actor}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Link */}
        <button
          onClick={() => navigate(`/movie/${id}/reviews`)}
          className="w-full bg-card border border-border rounded-2xl p-4 mb-6 hover:border-primary transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p style={{ fontWeight: 600 }}>User Reviews</p>
              <p className="text-sm text-muted-foreground">
                See what others are saying
              </p>
            </div>
            <Star className="w-5 h-5 text-primary" />
          </div>
        </button>

        {/* Book Button */}
        <Button
          onClick={() => navigate(`/movie/${id}/theatre`)}
          className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-2xl text-lg"
        >
          Select Theatre & Showtime
        </Button>
      </div>
    </div>
  );
}
