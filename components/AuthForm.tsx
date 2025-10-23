"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

type AuthFormProps = {
  mode: "login" | "register" | "reset-password";
  redirectTo?: string;
};

export default function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  const router = useRouter();
  const { user } = useAuth();

  // Prevent unnecessary redirects
  useEffect(() => {
    let isActive = true;

    const checkAuthAndRedirect = () => {
      if (!user || !isActive || mode === "reset-password") return;

      console.log(
        "User authenticated, redirecting to:",
        redirectTo || "/dashboard",
      );
      try {
        // Check if the user is verified
        if (user.email_confirmed_at || user.confirmed_at) {
          router.replace(redirectTo || "/dashboard");
        }
      } catch (error) {
        console.error("Redirect error:", error);
      }
    };

    checkAuthAndRedirect();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isActive = false;
    };
  }, [user, mode, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      // Form validation
      if (!email) {
        throw new Error("Email is required");
      }
      if (mode !== "reset-password" && !password) {
        throw new Error("Password is required");
      }
      if (mode === "register") {
        if (!confirmPassword) {
          throw new Error("Please confirm your password");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
      }

      console.log("Attempting auth operation:", mode);
      let error = null;

      switch (mode) {
        case "login":
          const { data, error: signInError } = await signIn(email, password);
          if (!signInError && data?.session) {
            // Set session in cookies for middleware
            const {
              createClientComponentClient,
            } = require("@supabase/auth-helpers-nextjs");
            const supabase = createClientComponentClient();
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            });
            router.replace(redirectTo || "/dashboard");
            return;
          }
          error = signInError;
          break;

        case "register":
          ({ error } = await signUp(email, password));
          if (!error) {
            setMessage("Please check your email to verify your account.");
            console.log("Registration successful, verification email sent");
          }
          break;

        case "reset-password":
          ({ error } = await resetPassword(email));
          if (!error) {
            setMessage(
              "Please check your email for password reset instructions.",
            );
            console.log("Password reset email sent");
          }
          break;

        default:
          throw new Error("Invalid form mode");
      }

      if (error) {
        console.error("Auth operation error:", error);
        throw error;
      }
    } catch (e: any) {
      console.error("Form submission error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
            />
          </div>

          {mode !== "reset-password" && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {mode === "login" ? (
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                />
              ) : (
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                />
              )}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
              />
            </div>
          )}
        </div>

        {mode === "login" && (
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                href="/get-started?mode=reset-password"
                className="font-medium text-brand-orange hover:text-brand-orange-dark"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Sign In"
              : mode === "register"
                ? "Sign Up"
                : "Reset Password"}
        </button>
      </form>

      {mode !== "reset-password" && (
        <div className="mt-6 text-sm text-center">
          {mode === "login" ? (
            <>
              <p className="mb-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/get-started?mode=register"
                  className="font-medium text-brand-orange hover:text-brand-orange-dark"
                >
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/get-started?mode=login"
                className="font-medium text-brand-orange hover:text-brand-orange-dark"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
