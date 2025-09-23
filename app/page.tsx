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
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black overflow-hidden p-0 m-0" data-aos="fade-up">
        {/* Hero Image */}
        <img 
          src="/heropics.png" 
          alt="Object Technologies Hero" 
          className="absolute inset-0 w-full h-full object-cover object-top md:object-center opacity-60" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 md:px-8 max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-hero text-brand-white mb-6 leading-tight drop-shadow-2xl flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <span role="img" aria-label="Rocket" className="text-4xl md:text-6xl animate-bounce-slow">🚀</span>
              <span className="text-center">
                Empowering Businesses with 
                <span className="text-gradient block md:inline md:ml-3">
                  Digital Innovation
                </span>
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up animate-delay-200">
            <p className="text-lg md:text-2xl max-w-4xl font-inter mb-10 text-brand-white/90 leading-relaxed">
              At Object Technologies, we merge creativity, technology, and strategy to deliver cutting-edge 
              <span className="text-brand-orange font-semibold"> digital marketing solutions</span> and 
              <span className="text-brand-orange font-semibold"> software products</span> that help your business thrive in today's fast-moving world.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="animate-fade-in-up animate-delay-300 flex flex-col md:flex-row gap-4 justify-center w-full md:w-auto">
            <a 
              href="#contact" 
              className="btn-primary text-lg px-8 py-4 group"
            >
              <span className="mr-2">📩</span>
              Get a Free Consultation
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a 
              href="#services" 
              className="btn-secondary text-lg px-8 py-4 bg-brand-white/10 backdrop-blur-sm border-brand-white/30 text-brand-white hover:bg-brand-white hover:text-brand-black group"
            >
              <span className="mr-2">💼</span>
              Explore Our Services
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
          
          {/* Stats or Trust Indicators */}
          <div className="animate-fade-in-up animate-delay-300 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">50+</div>
              <div className="text-brand-white/80 font-medium">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">300%</div>
              <div className="text-brand-white/80 font-medium">Average Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">24/7</div>
              <div className="text-brand-white/80 font-medium">Support Available</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brand-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="section-padding container-max" id="about" data-aos="fade-up" data-aos-delay="100">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-brand-orange">About Us</h2>
          <p className="text-section-subtitle">Your trusted partner in digital transformation</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Who We Are</h3>
              <p className="text-brand-gray-700 leading-relaxed">
                Object Technologies is more than just a digital agency — we're a growth partner for businesses that want to thrive in the modern world. Based in Lagos, Nigeria, we specialize in website development, digital marketing, branding, and software solutions.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Our Mission</h3>
              <p className="text-brand-gray-700 leading-relaxed">
                To empower businesses with digital tools and strategies that drive measurable growth. We create systems that help your brand attract the right audience, build trust, and convert leads into loyal customers.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Our Vision</h3>
              <p className="text-brand-gray-700 leading-relaxed">
                To become Africa's leading digital solutions hub, setting the standard for innovation and excellence in website development, digital marketing, and software technology.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Our Values</h3>
              <ul className="space-y-2 text-brand-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span><strong>Innovation</strong> – Constant creativity and forward thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span><strong>Integrity</strong> – Honesty and transparency in every relationship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span><strong>Growth</strong> – Your success is our success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-brand-gray-50" id="services" data-aos="fade-up" data-aos-delay="200">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Our Services & Projects</h2>
            <p className="text-section-subtitle">Comprehensive digital solutions for your business growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="card card-hover">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Web Development</h3>
              <ul className="space-y-2 text-brand-gray-700 text-sm">
                <li>• Business Websites & E-commerce</li>
                <li>• Web Applications & SaaS</li>
                <li>• Custom Enterprise Software</li>
                <li>• Mobile App Development</li>
              </ul>
            </div>
            
            <div className="card card-hover">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Digital Marketing</h3>
              <ul className="space-y-2 text-brand-gray-700 text-sm">
                <li>• Social Media Marketing</li>
                <li>• Paid Ads & Campaigns</li>
                <li>• SEO & Content Marketing</li>
                <li>• Branding & Design</li>
              </ul>
            </div>
            
            <div className="card card-hover">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3 font-poppins">Business Growth</h3>
              <ul className="space-y-2 text-brand-gray-700 text-sm">
                <li>• Digital Strategy Consulting</li>
                <li>• Performance Analytics</li>
                <li>• Conversion Optimization</li>
                <li>• Business Automation</li>
              </ul>
            </div>
          </div>
          
          <div className="card bg-brand-orange/5 border-l-4 border-brand-orange">
            <h3 className="text-xl font-bold text-brand-orange mb-4 font-poppins">Featured Success Stories</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <strong className="text-brand-black">E-commerce Platform</strong>
                <p className="text-brand-gray-600">300% increase in online sales for retail brand</p>
              </div>
              <div>
                <strong className="text-brand-black">Logistics Software</strong>
                <p className="text-brand-gray-600">Streamlined operations with real-time tracking</p>
              </div>
              <div>
                <strong className="text-brand-black">Marketing Campaign</strong>
                <p className="text-brand-gray-600">10,000+ qualified leads in 90 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding container-max" id="testimonials" data-aos="fade-up" data-aos-delay="300">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-brand-orange">What Our Clients Say</h2>
          <p className="text-section-subtitle">Real results from real businesses</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-brand-orange text-2xl mb-4">"</div>
            <p className="text-brand-gray-700 mb-4 italic">
              "Object Technologies transformed our online presence. From website design to social media ads, everything was seamless. Our sales doubled in 3 months!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center">
                <span className="text-brand-orange font-semibold">CA</span>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Chinedu A.</div>
                <div className="text-brand-gray-500 text-sm">Retail Business Owner</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="text-brand-orange text-2xl mb-4">"</div>
            <p className="text-brand-gray-700 mb-4 italic">
              "Their custom logistics software saved us hours of manual work daily. The team understood our needs and delivered perfectly."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center">
                <span className="text-brand-orange font-semibold">NO</span>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Ngozi O.</div>
                <div className="text-brand-gray-500 text-sm">Logistics Entrepreneur</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="text-brand-orange text-2xl mb-4">"</div>
            <p className="text-brand-gray-700 mb-4 italic">
              "Professional, reliable, and result-driven. Object Technologies is the agency you want if you're serious about growth."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center">
                <span className="text-brand-orange font-semibold">TB</span>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Tunde B.</div>
                <div className="text-brand-gray-500 text-sm">Startup Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white" id="contact" data-aos="fade-up" data-aos-delay="400">
        <div className="container-max text-center">
          <h2 className="text-section-title text-brand-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's build your success story together. Join the growing list of businesses that trust Object Technologies.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/login" className="btn-primary bg-brand-white text-brand-orange hover:bg-brand-gray-100">
              Start Your Project Today
            </a>
            <a href="#services" className="btn-outline border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-orange">
              Learn More About Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}