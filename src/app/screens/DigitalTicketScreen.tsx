import { useLocation } from "react-router";
import { motion } from "motion/react";
import { Download, Share2, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function DigitalTicketScreen() {
  const location = useLocation();
  const { movie, theatre, date, time, seats, bookingId } = location.state || {};
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Success Message */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-center">
            Your ticket has been successfully booked
          </p>
        </motion.div>

        {/* Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-6"
        >
          {/* Ticket Card */}
          <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-3xl overflow-hidden">
            {/* Movie Banner */}
            <div className="relative h-40">
              <img
                src={movie?.banner}
                alt={movie?.title || "Movie"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>

            {/* Ticket Details */}
            <div className="p-6">
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                {movie?.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p style={{ fontWeight: 600 }}>{date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time</p>
                  <p style={{ fontWeight: 600 }}>{time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Theatre</p>
                  <p style={{ fontWeight: 600 }}>{theatre?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Seats</p>
                  <p style={{ fontWeight: 600 }}>{seats?.join(", ")}</p>
                </div>
              </div>

              {/* Divider with holes */}
              <div className="relative my-6">
                <div className="border-t border-dashed border-border" />
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full" />
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full" />
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center py-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Show this code at the entrance
                </p>
                <div className="bg-white p-4 rounded-2xl">
                  <div className="w-40 h-40 grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Booking ID: {bookingId}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border bg-card"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border bg-card"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Please arrive 15 minutes before showtime
          </p>
        </div>
      </div>
    </div>
  );
}
