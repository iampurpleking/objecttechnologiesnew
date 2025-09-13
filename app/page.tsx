"use client";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Home() {
  // Move FontAwesome imports inside the component to avoid SSR issues
  const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
  const { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } = require('@fortawesome/free-brands-svg-icons');
  const AOS = require('aos');
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
  <main className="min-h-screen bg-brand-white text-brand-black flex flex-col items-center justify-center p-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-center bg-black overflow-hidden p-0 m-0" data-aos="fade-up">
        {/* Hero Image */}
        <img src="/heropics.png" alt="Object Technologies Hero" className="absolute inset-0 w-full h-full object-cover object-top md:object-center opacity-70" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-2 md:px-0">
          <h1 className="text-3xl md:text-6xl font-extrabold text-brand-orange font-poppins mb-6 leading-tight drop-shadow-lg flex items-center justify-center gap-1 md:gap-3 mx-2 md:mx-12 mt-8 md:mt-16">
            <span role="img" aria-label="Rocket" className="text-3xl md:text-5xl">🚀</span>
            <span className="text-center">Empowering Businesses with Digital Marketing & Software Innovation</span>
          </h1>
          <p className="text-base md:text-2xl max-w-2xl font-poppins mb-8 text-white/90 md:mx-auto mx-2">
            At Object Technologies, we merge creativity, technology, and strategy to deliver cutting-edge digital marketing solutions and software products that help your business thrive in today’s fast-moving world.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center w-full md:w-auto px-2 md:px-0">
            <a href="#contact" className="w-full md:w-auto max-w-xs mx-auto px-6 py-3 bg-brand-orange text-white rounded shadow font-semibold font-poppins hover:bg-brand-black transition-colors">📩 Get a Free Consultation</a>
            <a href="#services" className="w-full md:w-auto max-w-xs mx-auto px-6 py-3 border-2 border-brand-orange text-brand-orange rounded shadow font-semibold font-poppins hover:bg-brand-orange hover:text-white transition-colors bg-white/10 mb-4 md:mb-0">💼 Explore Our Services</a>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="w-full max-w-4xl mx-auto py-16 md:py-20 px-4 text-center" id="about" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins mb-4">About Us</h2>
        <p className="text-lg md:text-xl font-poppins text-brand-black/80 mb-4">
          Object Technologies (Innoshift Enterprises T/A Object Technologies) is a full-service <b>digital marketing and software development agency</b> built to help businesses scale with technology-driven solutions.
        </p>
        <p className="text-base md:text-lg font-poppins text-brand-black/70">
          We specialize in crafting high-performing websites, data-driven marketing campaigns, and powerful custom software that enable businesses to stand out, grow, and dominate their industry.<br/>
          Our approach is simple: <b>strategize, design, build, and optimize.</b> With a team of innovators, strategists, and developers, we transform ideas into impactful solutions that drive measurable results.
        </p>
      </section>

      {/* Services / Projects */}
      <section className="relative w-full bg-[#FFF6F0] py-16 md:py-20 px-0" id="services" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins mb-8 text-center">Our Services & Projects</h2>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="bg-brand-orange/10 rounded-lg p-8 shadow">
              <h3 className="text-2xl font-bold text-brand-orange mb-2 font-poppins">🔹 Digital Marketing</h3>
              <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1 text-left">
                <li>Social Media Marketing (Facebook, Instagram, X, LinkedIn)</li>
                <li>Paid Ads & Campaigns (Meta Ads, Google Ads)</li>
                <li>SEO & Content Marketing</li>
                <li>Branding & Design</li>
              </ul>
            </div>
            <div className="bg-brand-orange/10 rounded-lg p-8 shadow">
              <h3 className="text-2xl font-bold text-brand-orange mb-2 font-poppins">🔹 Software Development</h3>
              <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1 text-left">
                <li>Business Websites & E-commerce Stores</li>
                <li>Web Applications & SaaS Solutions</li>
                <li>Custom Software for Enterprises</li>
                <li>Mobile App Development</li>
              </ul>
            </div>
          </div>
          <div className="bg-brand-orange/5 rounded-lg p-8 shadow mb-8">
            <h3 className="text-xl font-bold text-brand-orange mb-4 font-poppins">🔹 Featured Projects</h3>
            <ul className="list-decimal pl-6 text-brand-black/80 font-poppins space-y-2 text-left">
              <li><b>E-commerce Platform for Retail Brand</b> – Increased online sales by 300% in 6 months.</li>
              <li><b>Custom Logistics Management Software</b> – Helped a transport company streamline operations with real-time tracking.</li>
              <li><b>Digital Marketing Campaign for Startup</b> – Delivered 10,000+ leads in under 90 days.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-4xl mx-auto py-16 md:py-20 px-4" id="testimonials" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins mb-8 text-center">Testimonials</h2>
        <div className="space-y-8">
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <p className="italic text-lg md:text-xl font-poppins text-brand-black mb-2">“Object Technologies transformed our online presence. From website design to social media ads, everything was seamless. Our sales doubled in 3 months!”</p>
            <span className="block text-brand-orange font-bold font-poppins">— Chinedu A., Retail Business Owner</span>
          </div>
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <p className="italic text-lg md:text-xl font-poppins text-brand-black mb-2">“Their custom logistics software saved us hours of manual work daily. The team understood our needs and delivered perfectly.”</p>
            <span className="block text-brand-orange font-bold font-poppins">— Ngozi O., Logistics Entrepreneur</span>
          </div>
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <p className="italic text-lg md:text-xl font-poppins text-brand-black mb-2">“Professional, reliable, and result-driven. Object Technologies is the agency you want if you’re serious about growth.”</p>
            <span className="block text-brand-orange font-bold font-poppins">— Tunde B., Startup Founder</span>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full max-w-3xl mx-auto py-16 md:py-20 px-4 text-center" id="contact" data-aos="fade-up" data-aos-delay="400">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins mb-4">Ready to take your business to the next level?</h2>
        <p className="text-lg md:text-xl font-poppins text-brand-black/80 mb-8">Let’s build your success story together.</p>
        <a href="/login" className="px-8 py-3 bg-brand-orange text-white rounded shadow font-semibold font-poppins hover:bg-brand-black transition-colors">Start Your Project Today</a>
      </section>

     {/* Footer */}
      <footer className="w-full bg-brand-orange/10 py-8 px-4 mt-8" data-aos="fade-up" data-aos-delay="500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Contact Form */}
          <form className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 mb-8 md:mb-0" id="contact-form">
            <h3 className="text-xl font-bold text-brand-orange font-poppins mb-4">Contact Us</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-poppins text-brand-black/80">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-poppins text-brand-black/80">Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="you@email.com" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1 font-poppins text-brand-black/80">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="w-full py-2 bg-brand-orange text-white font-semibold rounded hover:bg-brand-black transition-colors font-poppins">Send Message</button>
            <p className="text-xs text-brand-black/60 mt-2">This form will be connected to SendGrid API soon.</p>
          </form>
          {/* Company Info & Socials */}
          <div className="flex-1 flex flex-col gap-6 md:gap-2 md:items-end">
            <div className="text-center md:text-left font-poppins">
              <div className="font-bold text-brand-orange text-lg mb-1">Object Technologies (Innoshift Enterprises)</div>
              <div className="text-brand-black/80">Email: <span className="text-brand-black/90">help.objecttechnologies@gmail.com</span></div>
              <div className="text-brand-black/80">Phone: <span className="text-brand-black/90">+23491 3892 7374</span></div>
              <div className="text-brand-black/80">Address: <span className="text-brand-black/90">12, Adewole Okediran Street, Iba New Site, Ojo, Lagos.</span></div>
            </div>
            <div className="font-poppins font-semibold text-brand-black/80 mb-1">Follow Us:</div>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="text-brand-orange hover:text-brand-black" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-brand-orange hover:text-brand-black" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-brand-orange hover:text-brand-black" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="text-brand-orange hover:text-brand-black" aria-label="X">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-brand-orange hover:text-brand-black" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
            <div className="text-brand-black/60 text-sm mt-2">© 2025 Innoshift Enterprises T/A Object Technologies. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
