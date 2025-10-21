"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-gray-900 text-brand-white">
      {/* Main Footer Content */}
      <div className="section-padding border-b border-brand-gray-800">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="Object Technologies Logo" className="h-10 w-10 object-contain" />
                <div>
                  <div className="text-xl font-bold text-brand-orange font-poppins">Object Technologies</div>
                  <div className="text-sm text-brand-gray-400">Digital Innovation Partners</div>
                </div>
              </div>
              <p className="text-brand-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering businesses across Africa with cutting-edge digital marketing solutions and 
                software development services. Your growth is our mission.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-brand-gray-300">
                  <span className="text-brand-orange w-4">📧</span>
                  <a href="mailto:help.objecttechnologies@gmail.com" className="hover:text-brand-orange transition-colors">
                    help.objecttechnologies@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-brand-gray-300">
                  <span className="text-brand-orange w-4">📞</span>
                  <a href="tel:+2349138927374" className="hover:text-brand-orange transition-colors">
                    +234 913 892 7374
                  </a>
                </div>
                <div className="flex items-start gap-3 text-brand-gray-300">
                  <span className="text-brand-orange w-4 mt-1">📍</span>
                  <span>12, Adewole Okediran Street, Iba New Site, Ojo, Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-brand-white mb-4 font-poppins">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-brand-gray-300 hover:text-brand-orange transition-colors">About</Link></li>
                <li><Link href="/#services" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Services</Link></li>
                <li><Link href="/projects" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Projects</Link></li>
                <li><Link href="/testimonials" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Testimonials</Link></li>
                <li><Link href="/products" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Products</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-brand-white mb-4 font-poppins">Services</h3>
              <ul className="space-y-3">
                <li><span className="text-brand-gray-300">Web Development</span></li>
                <li><span className="text-brand-gray-300">Mobile Apps</span></li>
                <li><span className="text-brand-gray-300">Digital Marketing</span></li>
                <li><span className="text-brand-gray-300">SEO & Content</span></li>
                <li><span className="text-brand-gray-300">E-commerce</span></li>
                <li><Link href="/dashboard" className="text-brand-gray-300 hover:text-brand-orange transition-colors">Client Dashboard</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12 bg-brand-gray-800 rounded-xl p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-orange font-poppins mb-4">Ready to Get Started?</h3>
                <p className="text-brand-gray-300 mb-4">
                  Let's discuss your project and see how we can help your business grow.
                </p>
                <div className="flex gap-4">
                  <Link href="/login" className="btn-primary">
                    Start Your Project
                  </Link>
                  <a href="mailto:help.objecttechnologies@gmail.com" className="btn-outline border-brand-gray-600 text-brand-gray-300 hover:border-brand-orange hover:text-brand-orange">
                    Send Email
                  </a>
                </div>
              </div>
              
              <div className="lg:text-right">
                <p className="text-brand-gray-400 text-sm mb-4">Follow us on social media for updates and tips</p>
                <div className="flex gap-4 lg:justify-end">
                  <a href="https://www.facebook.com/profile.php?id=61579215426826" className="w-10 h-10 bg-brand-gray-700 rounded-full flex items-center justify-center text-brand-gray-300 hover:bg-brand-orange hover:text-brand-white transition-all duration-300" aria-label="Facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="https://www.instagram.com/object_technologies?igsh=MWh0ejZydzZzbHU3cA==
" className="w-10 h-10 bg-brand-gray-700 rounded-full flex items-center justify-center text-brand-gray-300 hover:bg-brand-orange hover:text-brand-white transition-all duration-300" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://www.linkedin.com/company/objecttechnologie/" className="w-10 h-10 bg-brand-gray-700 rounded-full flex items-center justify-center text-brand-gray-300 hover:bg-brand-orange hover:text-brand-white transition-all duration-300" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href=" https://x.com/object_techno?t=-RDB3h03zqroaQFlUDlFuQ&s=09" className="w-10 h-10 bg-brand-gray-700 rounded-full flex items-center justify-center text-brand-gray-300 hover:bg-brand-orange hover:text-brand-white transition-all duration-300" aria-label="X">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="https://wa.me/2349138927374" className="w-10 h-10 bg-brand-gray-700 rounded-full flex items-center justify-center text-brand-gray-300 hover:bg-brand-orange hover:text-brand-white transition-all duration-300" aria-label="WhatsApp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6 bg-brand-gray-800">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brand-gray-400">
            <div>
              © {currentYear} Innoshift Enterprises T/A Object Technologies. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-brand-orange transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-brand-orange transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
