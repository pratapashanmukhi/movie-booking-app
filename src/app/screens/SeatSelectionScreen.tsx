import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Share2, Check, Copy, Users } from "lucide-react";
import { Button } from "../components/ui/button";
<<<<<<< HEAD
import { movies, theatres } from "../data/movies";
=======
import { movies } from "../data/movies";
>>>>>>> 64f2aa63aa6c4d0ff63db9987f240e67fe32e74c
import { useAuth } from "../contexts/AuthContext";
import { socket } from "../utils/socket";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 10;

export function SeatSelectionScreen() {
  const { id, sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Local state for regular booking
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Group booking state
  const [isGroupSession, setIsGroupSession] = useState(!!sessionId);
  const [sessionUsers, setSessionUsers] = useState<any[]>([]);
  const [lockedSeats, setLockedSeats] = useState<Record<string, string>>({});
  const [groupContext, setGroupContext] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAcceptPrompt, setShowAcceptPrompt] = useState(false);
  const [inviterName, setInviterName] = useState("");
  const [hasAccepted, setHasAccepted] = useState(false);

  // Use group context if available, otherwise local context
  const movie = isGroupSession ? groupContext?.movie : movies.find((m) => m.id === id);
  const { theatre, date, time } = isGroupSession 
    ? { theatre: groupContext?.theatre, date: groupContext?.date, time: groupContext?.time }
    : (location.state || {});

  // Mock previously booked seats
  const bookedSeats = ["A5", "A6", "B4", "C7", "C8", "D5", "E6", "E7"];

  useEffect(() => {
    if (sessionId && currentUser) {
<<<<<<< HEAD
      // Mock session details
      if (!hasAccepted) {
        setHasAccepted(true);
        setGroupContext({
          movie: movies.find((m) => m.id === id),
          theatre: location.state?.theatre || theatres[0],
          date: location.state?.date || "Today",
          time: location.state?.time || "10:00 AM",
        });
        setSessionUsers([{ name: currentUser.name }]);
        setLockedSeats({});
      }
    }
  }, [sessionId, currentUser, navigate, hasAccepted, id, location.state]);
=======
      if (!socket.connected) {
        socket.connect();
      }

      // If joining an existing session, we need to prompt them first
      // But only if we haven't already accepted or are the creator
      if (!hasAccepted) {
        socket.emit('getSessionDetails', sessionId, (response: any) => {
          if (response.error) {
            alert(response.error);
            navigate('/home');
          } else {
            // Check if creator
            if (response.creatorName === currentUser.name) {
              setHasAccepted(true);
            } else {
              setInviterName(response.creatorName);
              setGroupContext(response);
              setShowAcceptPrompt(true);
            }
          }
        });
      } else {
        // We have accepted, now join the room
        socket.emit('joinSession', { sessionId, userName: currentUser.name || "Anonymous" }, (response: any) => {
          if (response.error) {
            alert(response.error);
            navigate('/home');
          } else {
            setGroupContext(response.sessionData);
            setSessionUsers(response.sessionData.users || []);
            setLockedSeats(response.sessionData.seats || {});
          }
        });
      }

      socket.on('userJoined', (data) => {
        setSessionUsers(data.users);
      });

      socket.on('userLeft', (data) => {
        setSessionUsers(data.users);
      });

      socket.on('seatUpdated', (data) => {
        setLockedSeats(data.seats);
      });

      return () => {
        socket.off('userJoined');
        socket.off('userLeft');
        socket.off('seatUpdated');
      };
    }
  }, [sessionId, currentUser, navigate, hasAccepted]);
>>>>>>> 64f2aa63aa6c4d0ff63db9987f240e67fe32e74c

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    
    if (isGroupSession) {
      const userName = currentUser?.name || "Anonymous";
<<<<<<< HEAD
      if (lockedSeats[seat] && lockedSeats[seat] !== userName) return;

      setLockedSeats(prev => {
        const next = { ...prev };
        if (next[seat] === userName) {
          delete next[seat];
        } else {
          next[seat] = userName;
        }
        return next;
      });
=======
      // If seat is locked by someone else, ignore
      if (lockedSeats[seat] && lockedSeats[seat] !== userName) return;

      if (lockedSeats[seat] === userName) {
        socket.emit('deselectSeat', { sessionId, seat, userName });
      } else {
        socket.emit('selectSeat', { sessionId, seat, userName });
      }
>>>>>>> 64f2aa63aa6c4d0ff63db9987f240e67fe32e74c
    } else {
      setSelectedSeats((prev) =>
        prev.includes(seat)
          ? prev.filter((s) => s !== seat)
          : [...prev, seat]
      );
    }
  };

  const getSeatColor = (seat: string) => {
    if (bookedSeats.includes(seat)) return "bg-muted text-muted-foreground cursor-not-allowed";
    
    if (isGroupSession) {
      const userName = currentUser?.name || "Anonymous";
      if (lockedSeats[seat] === userName) return "bg-gradient-to-br from-red-600 to-orange-600 text-white";
      if (lockedSeats[seat]) return "bg-blue-500/20 border-blue-500 text-blue-500 cursor-not-allowed"; // Someone else
      return "bg-card border border-border hover:border-primary cursor-pointer";
    }

    if (selectedSeats.includes(seat)) return "bg-gradient-to-br from-red-600 to-orange-600 text-white";
    return "bg-card border border-border hover:border-primary cursor-pointer";
  };

  // Calculate price dynamically for group or local
  const currentSelectedSeats = isGroupSession
    ? Object.keys(lockedSeats).filter(seat => lockedSeats[seat] === (currentUser?.name || "Anonymous"))
    : selectedSeats;

  const totalPrice = currentSelectedSeats.length * 12;
  const convenienceFee = currentSelectedSeats.length * 1.5;

  const handleBook = () => {
    navigate("/booking/confirmation", {
      state: {
        movie,
        theatre,
        date,
        time,
        seats: currentSelectedSeats,
        totalPrice,
        convenienceFee,
        sessionId: isGroupSession ? sessionId : undefined,
        groupSeats: isGroupSession ? lockedSeats : undefined
      }
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Accept Invitation Modal Overlay */}
      <AnimatePresence>
        {showAcceptPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-md rounded-3xl p-6 border border-border shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Group Booking Invite</h2>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">{inviterName}</strong> has invited you to join a booking for <strong className="text-foreground">{groupContext?.movie?.title || "a movie"}</strong>.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/home')}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl"
                >
                  Decline
                </Button>
                <Button 
                  onClick={() => {
                    setShowAcceptPrompt(false);
                    setHasAccepted(true);
                  }}
                  className="flex-1 h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl"
                >
                  Accept & Join
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Select Seats
            </h1>
            <p className="text-sm text-muted-foreground">Choose your seats</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Group Booking Banner */}
        {isGroupSession && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-primary font-semibold mb-1">Group Booking Session</h3>
                <p className="text-xs text-muted-foreground">{sessionUsers.length} user(s) currently selecting</p>
              </div>
              <Button size="sm" variant="outline" className="h-8 shadow-none" onClick={copyLink}>
                {copiedLink ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                <span className="text-xs">{copiedLink ? "Copied" : "Copy Link"}</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {sessionUsers.map((user, idx) => (
                <div key={idx} className="bg-background rounded-full px-2.5 py-1 flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${user.name === currentUser?.name ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <span className="text-xs">{user.name} {user.name === currentUser?.name && '(You)'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen */}
        <div className="mb-8">
          <div className="relative">
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2" />
            <p className="text-center text-sm text-muted-foreground">Screen</p>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-block min-w-full">
            {ROWS.map((row) => (
              <div key={row} className="flex items-center gap-2 mb-2">
                <span className="w-6 text-sm text-muted-foreground">{row}</span>
                <div className="flex gap-2">
                  {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                    const seatNumber = i + 1;
                    const seat = `${row}${seatNumber}`;
                    return (
                      <motion.button
                        key={seat}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSeat(seat)}
                        className={`w-8 h-8 rounded-lg text-xs transition-all ${getSeatColor(
                          seat
                        )}`}
                      >
                        {seatNumber}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-6">
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-card border border-border rounded-lg" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg" />
              <span className="text-sm">Your Seats</span>
            </div>
            {isGroupSession && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500/20 border-blue-500 text-blue-500 rounded-lg" />
                <span className="text-sm">Others</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted rounded-lg" />
              <span className="text-sm">Sold Out</span>
            </div>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {currentSelectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4 mb-6"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Your Selected Seats</span>
              <span style={{ fontWeight: 600 }}>{currentSelectedSeats.join(", ")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Your Total Amount</span>
              <span className="text-primary text-xl" style={{ fontWeight: 700 }}>
                ${totalPrice}
              </span>
            </div>
          </motion.div>
        )}

        {/* Book Button */}
        <div className="fixed bottom-20 left-0 right-0 px-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleBook}
              disabled={currentSelectedSeats.length === 0}
              className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Payment ({currentSelectedSeats.length} {currentSelectedSeats.length === 1 ? 'seat' : 'seats'})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
