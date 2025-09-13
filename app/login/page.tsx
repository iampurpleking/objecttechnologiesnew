"use client";
import { useState } from "react";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-brand-orange font-poppins mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>
        <form className="flex flex-col gap-4">
          {isSignup && (
            <div>
              <label className="block mb-1 font-poppins text-brand-black/80" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="Your Name" />
            </div>
          )}
          <div>
            <label className="block mb-1 font-poppins text-brand-black/80" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block mb-1 font-poppins text-brand-black/80" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="Password" />
          </div>
          <button type="submit" className="w-full py-2 mt-2 bg-brand-orange text-white font-semibold rounded hover:bg-brand-black transition-colors font-poppins">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center font-poppins">
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <button className="text-brand-orange underline" onClick={() => setIsSignup(false)}>Login</button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{' '}
              <button className="text-brand-orange underline" onClick={() => setIsSignup(true)}>Sign Up</button>
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
