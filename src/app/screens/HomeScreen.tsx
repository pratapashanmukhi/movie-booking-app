import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { motion } from "motion/react";
import { MovieCard } from "../components/MovieCard";
import { movies } from "../data/movies";
import { Input } from "../components/ui/input";

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nowShowing = filteredMovies.slice(0, 3);
  const upcoming = filteredMovies.slice(3, 6);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-card to-background px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl" style={{ fontWeight: 700 }}>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  CineVerse
                </span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Find your next movie
              </p>
            </div>
            <button className="bg-card border border-border w-10 h-10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-background/50 border-border h-12 rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden h-48">
            <img
              src={movies[0].banner}
              alt="Featured"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-xl mb-2" style={{ fontWeight: 700 }}>
                {movies[0].title}
              </h2>
              <p className="text-sm text-white/80 mb-3">
                {movies[0].genre} • {movies[0].duration}
              </p>
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-6 py-2 rounded-full text-sm transition-all">
                Watch Trailer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Now Showing */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl" style={{ fontWeight: 600 }}>
              Now Showing
            </h2>
            <button className="text-sm text-primary">See All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {nowShowing.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>

        {/* Upcoming Movies */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl" style={{ fontWeight: 600 }}>
              Upcoming Movies
            </h2>
            <button className="text-sm text-primary">See All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {upcoming.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
