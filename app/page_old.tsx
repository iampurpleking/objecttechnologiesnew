"use client";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Footer from '../components/Footer';

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
        <div className="text-left space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-brand-black mb-2 font-poppins">Who We Are</h3>
            <p className="text-base md:text-lg font-poppins text-brand-black/80 mb-2">
              Object Technologies is more than just a digital agency — we’re a growth partner for businesses that want to thrive in the modern world. Based in Lagos, Nigeria, we specialize in website development, digital marketing, branding, and software solutions that help businesses of all sizes scale with confidence.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              We understand that today’s business landscape is fast-paced and competitive. That’s why we focus on delivering practical, result-driven solutions that combine creativity, technology, and strategy. Whether you’re a startup trying to establish an online presence or an established company looking to scale, Object Technologies provides the tools, expertise, and support you need to succeed.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-black mb-2 font-poppins">Our Story</h3>
            <p className="text-base md:text-lg font-poppins text-brand-black/80 mb-2">
              Object Technologies was founded with one clear idea: to help businesses harness the power of technology to grow.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              We noticed that many businesses in Nigeria and across Africa struggle with building strong digital identities — either their websites don’t convert, their marketing is ineffective, or they don’t have the right digital tools to compete. That’s where we come in.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              What started as a passion for building websites has grown into a full-service digital solutions agency serving entrepreneurs, startups, and established companies. From our very first project, we’ve been committed to creating not just beautiful designs but digital systems that work around the clock to bring results.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              Today, Object Technologies is trusted by businesses across industries because of one simple reason: we treat every project like it’s our own business.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-black mb-2 font-poppins">Our Mission</h3>
            <p className="text-base md:text-lg font-poppins text-brand-black/80 mb-2">
              Our mission is simple: to empower businesses with digital tools and strategies that drive measurable growth.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              We don’t just build websites or run campaigns — we create systems that help your brand attract the right audience, build trust, and convert leads into loyal customers. Every project we take on is guided by one goal: to deliver real results, not just promises.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-black mb-2 font-poppins">Our Vision</h3>
            <p className="text-base md:text-lg font-poppins text-brand-black/80 mb-2">
              We envision a future where businesses across Africa and beyond can leverage technology to compete globally. Our vision is to become Africa’s leading digital solutions hub, setting the standard for innovation and excellence in website development, digital marketing, and software technology.
            </p>
            <p className="text-base md:text-lg font-poppins text-brand-black/70 mb-2">
              We’re not just chasing trends; we’re building the future of digital business in Africa — and inviting ambitious brands to grow with us.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-black mb-2 font-poppins">Our Values</h3>
            <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1">
              <li><b>Innovation</b> – We believe in constant creativity and forward thinking, using the latest technology to deliver cutting-edge solutions.</li>
              <li><b>Integrity</b> – We value honesty and transparency in every relationship, from client projects to team collaborations.</li>
              <li><b>Growth</b> – Your growth is our success. Every service we provide is designed to help you scale sustainably.</li>
              <li><b>Customer Success</b> – We measure our achievements by the success stories of our clients. When you win, we win.</li>
            </ul>
          </div>
        </div>
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
      <Footer />
    </main>
  );
}
