"use client";
import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";

export default function GetStartedPage() {
  // We read URL search params on the client inside an effect to avoid
  // Next.js requiring a Suspense boundary for `useSearchParams()` during
  // prerendering. Default values are provided for the first render.
  const [mode, setMode] = useState<"login" | "register" | "reset-password">(
    "login",
  );
  const [redirectTo, setRedirectTo] = useState<string>("/dashboard");

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const m = sp.get("mode") as "login" | "register" | "reset-password" | null;
      if (m) setMode(m);
      const r = sp.get("redirectTo");
      if (r) setRedirectTo(r);
    } catch (e) {
      // ignore — keep defaults
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img src="/logo.svg" alt="Logo" className="h-12 w-auto mx-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Get Started with Object Technologies
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === "reset-password"
              ? "Reset your password"
              : "Create an Account or sign in to start a project with us."}
          </p>
        </div>

        {/* Tabs */}
        {mode !== "reset-password" && (
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                mode === "register"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setMode("register")}
            >
              Create Account
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                mode === "login"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Form */}
        <div className="mt-8">
          <AuthForm mode={mode} redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}
