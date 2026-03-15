import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CreditCard, Wallet, Smartphone, Building2, Users, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { socket } from "../utils/socket";
import { useAuth } from "../contexts/AuthContext";

export function BookingConfirmationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paidUsers, setPaidUsers] = useState<string[]>([]);
  const [isWaitingForOthers, setIsWaitingForOthers] = useState(false);
  const [groupSeatsContext, setGroupSeatsContext] = useState<Record<string, string>>({});

  const {
    movie,
    theatre,
    date,
    time,
    seats,
    totalPrice,
    convenienceFee,
    sessionId,
    groupSeats
  } = location.state || {};

  useEffect(() => {
    if (groupSeats) {
      setGroupSeatsContext(groupSeats);
    }
  }, [sessionId, navigate, movie, theatre, date, time, seats, totalPrice, convenienceFee, groupSeats, currentUser]);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "wallet", name: "Digital Wallet", icon: Wallet },
    { id: "upi", name: "UPI Payment", icon: Smartphone },
    { id: "netbanking", name: "Net Banking", icon: Building2 },
  ];

  const handleConfirm = () => {
    if (selectedPayment) {
      if (sessionId && currentUser) {
        // Group booking flow - mark self as paid locally and redirect to finish
        setPaymentComplete(true);
        setIsWaitingForOthers(true);
        
        // Mock success
        setTimeout(() => {
          navigate("/booking/ticket", {
            state: {
              movie,
              theatre,
              date,
              time,
              seats,
              totalPrice,
              convenienceFee,
              bookingId: `CNV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
            }
          });
        }, 2500);
      } else {
        // Normal single booking flow
        navigate("/booking/ticket", {
          state: {
            movie,
            theatre,
            date,
            time,
            seats,
            totalPrice,
            convenienceFee,
            bookingId: `CNV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
          }
        });
      }
    }
  };

  const usersWithSeats = [...new Set(Object.values(groupSeatsContext))];
  const allPaid = Array.isArray(usersWithSeats) && usersWithSeats.length > 0 && usersWithSeats.every(user => paidUsers.includes(user as string));

  if (isWaitingForOthers) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card w-full max-w-md rounded-3xl p-8 border border-border shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>Payment Successful!</h2>
          <p className="text-muted-foreground mb-8">Waiting for other group members to complete their payments.</p>

          <div className="space-y-4">
            {usersWithSeats.map((user: any, idx) => (
              <div key={idx} className="flex justify-between items-center bg-background rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{user} {user === currentUser?.name && "(You)"}</span>
                </div>
                {paidUsers.includes(user) ? (
                  <span className="text-sm font-semibold text-green-500 flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Paid</span>
                ) : (
                  <span className="text-sm font-semibold text-orange-500 flex items-center">
                    <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mr-1.5" />
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
             <div className="text-sm text-muted-foreground">
               Tickets will be generated automatically once everyone pays.
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-background border border-border w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl" style={{ fontWeight: 700 }}>
                {sessionId ? "Split Payment Summary" : "Booking Summary"}
              </h1>
              <p className="text-sm text-muted-foreground">Review and pay your share</p>
            </div>
          </div>
          {sessionId && (
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <Users className="w-3 h-3 mr-1" /> Group
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5 mb-6"
        >
          <h2 className="text-lg mb-4" style={{ fontWeight: 600 }}>
            Booking Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Movie</span>
              <span style={{ fontWeight: 600 }}>{movie?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Theatre</span>
              <span style={{ fontWeight: 600 }}>{theatre?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span style={{ fontWeight: 600 }}>{date}, {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span style={{ fontWeight: 600 }}>{seats?.join(", ")}</span>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ticket Price ({seats?.length}x)</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span>${convenienceFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span style={{ fontWeight: 600 }}>Total Amount</span>
                <span className="text-primary text-xl" style={{ fontWeight: 700 }}>
                  ${(totalPrice + convenienceFee)?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg mb-4" style={{ fontWeight: 600 }}>
            Payment Method
          </h2>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full bg-card border rounded-2xl p-4 flex items-center gap-4 transition-all ${
                    selectedPayment === method.id
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedPayment === method.id
                        ? "bg-gradient-to-br from-red-600 to-orange-600"
                        : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        selectedPayment === method.id
                          ? "text-white"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p style={{ fontWeight: 600 }}>{method.name}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? "border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="fixed bottom-20 left-0 right-0 px-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleConfirm}
              disabled={!selectedPayment}
              className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm & Pay ${(totalPrice + convenienceFee)?.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
