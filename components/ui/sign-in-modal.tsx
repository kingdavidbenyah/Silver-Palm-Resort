"use client";

import { Modal } from "./modal";
import { Button } from "./button";
import { useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "./toast";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignUp,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast(`Signed in with ${provider} successfully!`, "success");
      onClose();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast("Welcome back! Signed in successfully! 🎉", "success");
      onClose();
      setFormData({ email: "", password: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome Back"
      modalClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div className="grid grid-cols-1 space-y-2">
          <label
            htmlFor="email"
            className="text-xs sm:text-sm sm:font-medium text-[var(--major-text)]"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--minor-text)]" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="text-sm md:text-base w-full pl-11 pr-4 py-3 bg-[var(--background)] border border-[var(--testimonial-border)] rounded-lg text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="grid grid-cols-1 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs sm:text-sm sm:font-medium text-[var(--major-text)]"
            >
              Password
            </label>
            <button
              type="button"
              className="cursor-pointer text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--minor-text)]" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="text-sm md:text-base w-full pl-11 pr-11 py-3 bg-[var(--background)] border border-[var(--testimonial-border)] rounded-lg text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[var(--minor-text)] hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          btnClassName="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--testimonial-border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[var(--bg-shade)] text-[var(--minor-text)]">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleSocialAuth("Google")}
            disabled={isLoading}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-[var(--background)] border border-[var(--testimonial-border)] rounded-lg hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FaGoogle className="w-5 h-5 text-[var(--major-text)] group-hover:text-primary transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth("Facebook")}
            disabled={isLoading}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-[var(--background)] border border-[var(--testimonial-border)] rounded-lg hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FaFacebookF className="w-5 h-5 text-[var(--major-text)] group-hover:text-primary transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth("GitHub")}
            disabled={isLoading}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-[var(--background)] border border-[var(--testimonial-border)] rounded-lg hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FaGithub className="w-5 h-5 text-[var(--major-text)] group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-[var(--minor-text)]">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToSignUp();
            }}
            className="cursor-pointer text-primary hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </form>
    </Modal>
  );
};
