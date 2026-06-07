import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";

interface PortalProps {
  user: { name: string; email: string } | null;
  onLogin: (userData: { name: string; email: string }) => void;
}

export function Portal({ user, onLogin }: PortalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate API Request
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        // Mock Login
        // For demonstration, accept any password that is at least 6 characters long
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        
        // Find or create user
        const displayName = email.split("@")[0];
        const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        const userData = { name: formattedName, email };
        
        onLogin(userData);
        navigate("/dashboard");
      } else {
        // Mock Sign Up
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }

        setSuccessMsg("Account created successfully! Logging you in...");
        
        setTimeout(() => {
          onLogin({ name, email });
          navigate("/dashboard");
        }, 1200);
      }
    }, 1200);
  };

  return (
    <div className="auth-container reveal">
      <div className="auth-card">
        {/* Brand Header */}
        <header className="auth-header">
          <div className="brand-mark" style={{ justifyContent: "center", marginBottom: "var(--space-2)" }}>
            <GraduationCap size={28} className="text-primary" style={{ color: "var(--signal)" }} />
            <span>TeacherPrecy</span>
          </div>
          <p>Atelier Zero • Inclusive Education</p>
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
        <form onSubmit={handleSubmit} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
            <div className="form-group" style={{ marginBlock: "8px" }}>
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
            style={{ marginTop: "12px" }}
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
