import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup 
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebase";

interface PortalProps {
  user: { name: string; email: string } | null;
}

export function Portal({ user }: PortalProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isLogin = searchParams.get("mode") !== "signup";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleModeSwitch = (toLogin: boolean) => {
    setError("");
    setSuccessMsg("");
    setSearchParams({ mode: toLogin ? "login" : "signup" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Basic Validation
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !name) {
      setError("Please enter your name to create an account.");
      return;
    }

    if (!isLogin && !agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Sign out immediately so they have to log in
        await auth.signOut();
        
        setSuccessMsg("Account created successfully! Please log in with your new credentials.");
        
        // Reset form and switch to login mode after a short delay
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setName("");
          setAgreeTerms(false);
          setSuccessMsg("");
          handleModeSwitch(true);
        }, 3000);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(`Authentication failed: ${err.code || "unknown error"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Social Auth error:", err);
      if (err.code === "auth/operation-not-allowed") {
        setError("Google/Facebook login is not enabled in your Firebase Console.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase Console > Authentication > Settings.");
      } else if (err.code !== "auth/popup-closed-by-user") {
        setError(`Authentication failed: ${err.code}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container reveal">
      <div className="auth-card">
        {/* Brand Header */}
        <header className="auth-header">
          <div className="brand-mark" style={{ justifyContent: "center", marginBottom: "var(--space-2)" }}>
            < GraduationCap size={24} className="text-primary" style={{ color: "var(--signal)" }} />
            <span>TeacherPrecy</span>
          </div>
          <p>Inclusive Education</p>
        </header>

        {/* Card Title */}
        <div className="auth-title-row">
          <h2>{isLogin ? "Welcome back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Access your specialized learning modules and session history."
              : "Join our inclusive educational studio today."}
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="booking-summary" style={{ color: "var(--danger)", borderLeft: "3px solid var(--danger)", background: "rgba(220, 38, 38, 0.05)", padding: "12px", marginBottom: "20px", borderRadius: "4px" }}>
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="booking-summary" style={{ color: "var(--success)", borderLeft: "3px solid var(--success)", background: "rgba(23, 163, 74, 0.05)", padding: "12px", marginBottom: "20px", borderRadius: "4px" }}>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Name Field (Sign Up only) */}
          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="form-input-wrapper">
                <User size={18} style={{ position: "absolute", left: "14px", color: "var(--voice)" }} />
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Precy Alarba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: "42px" }}
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="form-input-wrapper">
              <Mail size={18} style={{ position: "absolute", left: "14px", color: "var(--voice)" }} />
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder={isLogin ? "mentor@atelierzero.edu" : "precy@atelier.edu"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label" htmlFor="password">Password</label>
              {isLogin && (
                <a href="#forgot" className="form-link" onClick={(e) => { e.preventDefault(); alert("Password reset simulation: A reset link has been sent to your email."); }}>
                  Forgot password?
                </a>
              )}
            </div>
            <div className="form-input-wrapper">
              <Lock size={18} style={{ position: "absolute", left: "14px", color: "var(--voice)" }} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px", paddingRight: "42px" }}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms checkbox (Sign Up only) */}
          {!isLogin && (
            <div className="form-group" style={{ marginBlock: "4px" }}>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I agree to the{" "}
                  <a href="#terms" className="form-link" onClick={(e) => { e.preventDefault(); alert("Terms of Service details."); }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#privacy" className="form-link" onClick={(e) => { e.preventDefault(); alert("Privacy Policy details."); }}>Privacy Policy</a>.
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-btn-primary"
            disabled={isLoading}
            style={{ marginTop: "4px" }}
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{isLogin ? "Log In" : "Sign Up"}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Social Authentication */}
        <div className="social-auth-grid">
          <button 
            type="button" 
            className="btn-social google" 
            onClick={() => handleSocialLogin(googleProvider)}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>
          <button 
            type="button" 
            className="btn-social facebook" 
            onClick={() => handleSocialLogin(facebookProvider)}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        {/* Alt Auth Switcher */}
        <div className="auth-switch-text">
          {isLogin ? (
            <span>
              New to the atelier?{" "}
              <a href="#signup" onClick={(e) => { e.preventDefault(); handleModeSwitch(false); }}>
                Create an account
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <a href="#login" onClick={(e) => { e.preventDefault(); handleModeSwitch(true); }}>
                Log in
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
