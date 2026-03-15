import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react";
import { theatres } from "../data/movies";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { socket } from "../utils/socket";

export function TheatreShowtimeScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const handleContinue = () => {
    if (selectedTheatre && selectedShowtime) {
      const theatre = theatres.find(t => t.id === selectedTheatre);
      navigate(`/movie/${id}/seats`, {
        state: {
          theatre,
          date: selectedDate,
          time: selectedShowtime
        }
      });
    }
  };

  const handleGroupBooking = () => {
    if (selectedTheatre && selectedShowtime && currentUser) {
      setIsCreatingGroup(true);
      const theatre = theatres.find(t => t.id === selectedTheatre);
      
      if (!socket.connected) {
        socket.connect();
      }

      // Mock the socket response since we have no backend
      setTimeout(() => {
        setIsCreatingGroup(false);
        const mockSessionId = `test-session-${Math.random().toString(36).substring(7)}`;
        navigate(`/group-booking/${mockSessionId}`, {
          state: {
            theatre,
            date: selectedDate,
            time: selectedShowtime
          }
        });
      }, 800);
      /*
      socket.emit('createSession', {
        userName: currentUser.name || 'Anonymous',
        movie: { id },
        theatre: theatre,
        date: selectedDate,
        time: selectedShowtime
      }, (response: any) => {
        setIsCreatingGroup(false);
        if (response.sessionId) {
          navigate(`/group-booking/${response.sessionId}`, {
            state: {
              theatre,
              date: selectedDate,
              time: selectedShowtime
            }
          });
        }
      });
      */
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-background border border-border w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl" style={{ fontWeight: 700 }}>
              Select Theatre
            </h1>
            <p className="text-sm text-muted-foreground">Choose your showtime</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Date Selector */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
          {["Today", "Tomorrow", "Mon 17", "Tue 18", "Wed 19"].map((date) => (
            <motion.button
              key={date}
              onClick={() => setSelectedDate(date)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl whitespace-nowrap ${
                selectedDate === date
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white border-transparent"
                  : "bg-card border border-border"
              }`}
            >
              {date}
            </motion.button>
          ))}
        </div>

        {/* Theatres */}
        <div className="space-y-4">
          {theatres.map((theatre) => (
            <motion.div
              key={theatre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card border rounded-2xl p-5 ${
                selectedTheatre === theatre.id
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              <div className="mb-4">
                <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>
                  {theatre.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{theatre.location}</span>
                  </div>
                  <span>• {theatre.distance}</span>
                </div>
              </div>

              {/* Showtimes */}
              <div className="flex flex-wrap gap-2">
                {theatre.showtimes.map((time) => {
                  const isSelected =
                    selectedTheatre === theatre.id && selectedShowtime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedTheatre(theatre.id);
                        setSelectedShowtime(time);
                      }}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-red-600 to-orange-600 border-transparent text-white"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-sm">{time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Buttons */}
        <div className="fixed bottom-6 left-0 right-0 px-6 bg-background/80 backdrop-blur-md pb-4 pt-4">
          <div className="max-w-md mx-auto flex gap-3">
            <Button
              onClick={handleGroupBooking}
              disabled={!selectedTheatre || !selectedShowtime || isCreatingGroup}
              variant="outline"
              className="w-1/3 h-14 rounded-2xl border-primary text-primary hover:bg-primary/10"
            >
              {isCreatingGroup ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-xs">Group</span>
                </>
              )}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedTheatre || !selectedShowtime || isCreatingGroup}
              className="flex-1 h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Seats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
