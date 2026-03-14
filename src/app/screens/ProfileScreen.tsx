import { motion } from "motion/react";
import {
  User,
  Ticket,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export function ProfileScreen() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: Ticket, label: "My Bookings", badge: "3" },
    { icon: Heart, label: "Saved Movies", badge: "12" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout", danger: true, action: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-card to-background px-6 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl mb-6" style={{ fontWeight: 700 }}>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-card to-card/50 border border-border rounded-3xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwbWFufGVufDF8fHx8MTc3MzQwMzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-1" style={{ fontWeight: 700 }}>
                  {currentUser?.name || "Guest User"}
                </h2>
                <p className="text-sm text-muted-foreground">Movie Enthusiast</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{currentUser?.email || "Not signed in"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{currentUser?.phone || "Not provided"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-md mx-auto px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-4 text-center"
          >
            <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                24
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Movies Watched</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-4 text-center"
          >
            <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                3
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Active Bookings</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-4 text-center"
          >
            <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                12
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </motion.div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-md mx-auto px-6">
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={item.action}
                className={`w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary transition-all ${
                  item.danger ? "hover:border-red-500" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.danger
                      ? "bg-red-500/10"
                      : "bg-gradient-to-br from-red-600/10 to-orange-600/10"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      item.danger ? "text-red-500" : "text-primary"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p
                    style={{ fontWeight: 600 }}
                    className={item.danger ? "text-red-500" : ""}
                  >
                    {item.label}
                  </p>
                </div>
                {item.badge && (
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-5 h-5 ${
                    item.danger ? "text-red-500" : "text-muted-foreground"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Booking History */}
      <div className="max-w-md mx-auto px-6 mt-8">
        <h2 className="text-xl mb-4" style={{ fontWeight: 600 }}>
          Recent Bookings
        </h2>
        <div className="space-y-3">
          {[
            {
              movie: "The Dark Sentinel",
              date: "March 14, 2026",
              seats: "D5, D6, D7",
            },
            {
              movie: "Cosmic Odyssey",
              date: "March 10, 2026",
              seats: "A3, A4",
            },
          ].map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/10 to-orange-600/10 flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p style={{ fontWeight: 600 }}>{booking.movie}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="text-sm" style={{ fontWeight: 600 }}>
                    {booking.seats}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
