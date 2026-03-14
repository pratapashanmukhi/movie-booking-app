import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Film, Mail, Lock, ArrowRight, User, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { checkEmailExists, login, registerAndLogin } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    if (!email) {
      // If no email entered, allow Guest mode logic to proceed
      navigate("/home");
      return;
    }
    
    if (checkEmailExists(email)) {
      login(email);
      navigate("/home");
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingSubmit = () => {
    if (!name || !phone) return;
    registerAndLogin(email, name, phone);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1768381937064-0cff674a09ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdHJlJTIwZGFyayUyMGludGVyaW9yfGVufDF8fHx8MTc3MzQ2NTczMXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 p-3 rounded-2xl">
              <Film className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="space-y-4 bg-card/50 backdrop-blur-xl p-6 rounded-3xl border border-border">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 bg-background/50 border-border h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 bg-background/50 border-border h-12 rounded-xl"
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl mt-6"
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors">
              Forgot Password?
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 border-border rounded-xl bg-background/50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="h-12 border-border rounded-xl bg-background/50"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button className="text-primary hover:underline">Sign Up</button>
        </p>
        
        {/* Demo Mode Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            setEmail(""); // Ensure empty email proceeds as guest
            setTimeout(() => navigate("/home"), 0);
          }}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors py-2"
        >
          Continue as Guest / Demo Mode →
        </motion.button>
      </motion.div>

      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Welcome to CineVerse!</DialogTitle>
            <DialogDescription>
              We noticed you're logging in with a new email. Please tell us a bit about yourself to complete your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 bg-background/50 border-border h-12 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-11 bg-background/50 border-border h-12 rounded-xl"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={handleOnboardingSubmit}
            disabled={!name || !phone}
            className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl"
          >
            Complete Setup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}