"use client";

import Footer from '../../components/Footer';

export default function Products() {
  return (
  <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 px-2 md:px-0">
      <h1 className="text-4xl font-bold text-brand-orange font-poppins mb-4">Our Products</h1>
      <p className="max-w-2xl text-center text-lg font-poppins text-brand-black/80">
        Discover our range of products designed to empower your business and streamline your operations.
      </p>
      <Footer />
    </main>
  );
}
