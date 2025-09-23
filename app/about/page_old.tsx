"use client";

import Footer from '../../components/Footer';

export default function About() {
  return (
    <main className="min-h-screen bg-brand-white text-brand-black">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">About Object Technologies</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in digital transformation, empowering businesses across Africa 
            with innovative technology solutions and strategic digital marketing.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="card">
                <h2 className="text-section-title text-brand-orange mb-4">Our Mission</h2>
                <p className="text-brand-gray-700 leading-relaxed">
                  To empower businesses with digital tools and strategies that drive measurable growth. 
                  We create systems that help your brand attract the right audience, build trust, 
                  and convert leads into loyal customers.
                </p>
              </div>
              
              <div className="card">
                <h2 className="text-section-title text-brand-orange mb-4">Our Vision</h2>
                <p className="text-brand-gray-700 leading-relaxed">
                  To become Africa's leading digital solutions hub, setting the standard for innovation 
                  and excellence in website development, digital marketing, and software technology.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-brand-orange/10 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-brand-orange mb-2">Innovation Driven</h3>
                  <p className="text-brand-gray-600">Pushing boundaries in digital solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Our Story</h2>
            <p className="text-section-subtitle">How we became your digital transformation partner</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-brand-gray-700 leading-relaxed">
            <p className="text-lg">
              Object Technologies was founded with one clear idea: to help businesses harness the power of technology to grow. 
              We noticed that many businesses in Nigeria and across Africa struggle with building strong digital identities — 
              either their websites don't convert, their marketing is ineffective, or they don't have the right digital tools to compete.
            </p>
            
            <p>
              What started as a passion for building websites has grown into a full-service digital solutions agency 
              serving entrepreneurs, startups, and established companies. From our very first project, we've been 
              committed to creating not just beautiful designs but digital systems that work around the clock to bring results.
            </p>
            
            <p>
              Today, Object Technologies is trusted by businesses across industries because of one simple reason: 
              we treat every project like it's our own business. Your success is our success, and we're committed 
              to delivering solutions that drive real, measurable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Our Values</h2>
            <p className="text-section-subtitle">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card card-hover text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Innovation</h3>
              <p className="text-brand-gray-600 text-sm">
                Constant creativity and forward thinking, using the latest technology to deliver cutting-edge solutions.
              </p>
            </div>
            
            <div className="card card-hover text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Integrity</h3>
              <p className="text-brand-gray-600 text-sm">
                Honesty and transparency in every relationship, from client projects to team collaborations.
              </p>
            </div>
            
            <div className="card card-hover text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Growth</h3>
              <p className="text-brand-gray-600 text-sm">
                Your growth is our success. Every service we provide is designed to help you scale sustainably.
              </p>
            </div>
            
            <div className="card card-hover text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Excellence</h3>
              <p className="text-brand-gray-600 text-sm">
                We measure our achievements by the success stories of our clients. When you win, we win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Leadership Team</h2>
            <p className="text-section-subtitle">Meet the people driving digital innovation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-orange">OT</span>
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Founder & CEO</h3>
              <p className="text-brand-gray-600 text-sm">
                Visionary leader driving digital transformation across Africa
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-orange">TD</span>
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Technical Director</h3>
              <p className="text-brand-gray-600 text-sm">
                Leading our development team with cutting-edge technology solutions
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-orange">MD</span>
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Marketing Director</h3>
              <p className="text-brand-gray-600 text-sm">
                Strategizing digital marketing campaigns that deliver real results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h2 className="text-section-title text-brand-white mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the growing list of businesses that trust Object Technologies for their digital transformation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/login" className="btn-primary bg-brand-white text-brand-orange hover:bg-brand-gray-100">
              Start Your Project
            </a>
            <a href="/#contact" className="btn-outline border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-orange">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}