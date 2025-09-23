"use client";
import Footer from '../../components/Footer';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Chinedu Arinze",
      title: "CEO, Retail Business",
      company: "Fashion Forward",
      rating: 5,
      text: "Object Technologies transformed our online presence completely. From website design to social media ads, everything was seamless. Our online sales doubled in just 3 months, and customer engagement has never been better. The team truly understands what modern businesses need.",
      project: "E-commerce Platform & Digital Marketing",
      result: "200% increase in online sales"
    },
    {
      id: 2,
      name: "Ngozi Okafor",
      title: "Founder & MD",
      company: "Swift Logistics",
      rating: 5,
      text: "Their custom logistics software saved us hours of manual work daily. The real-time tracking system has improved our customer satisfaction dramatically. The team understood our complex requirements and delivered a solution that exceeded our expectations.",
      project: "Logistics Management System",
      result: "40% reduction in operational costs"
    },
    {
      id: 3,
      name: "Tunde Bakare",
      title: "Startup Founder",
      company: "TechStart Nigeria",
      rating: 5,
      text: "Professional, reliable, and result-driven. Object Technologies is the agency you want if you're serious about growth. They helped us launch our digital platform and achieve product-market fit in record time.",
      project: "MVP Development & Launch Strategy",
      result: "Successful product launch with 1000+ users"
    },
    {
      id: 4,
      name: "Sarah Ibrahim",
      title: "Marketing Director",
      company: "Green Energy Solutions",
      rating: 5,
      text: "The digital marketing campaign exceeded all our expectations. Not only did we reach our target audience effectively, but we also generated qualified leads that converted into long-term customers. ROI was exceptional.",
      project: "Digital Marketing Campaign",
      result: "10,000+ qualified leads in 90 days"
    },
    {
      id: 5,
      name: "Michael Adebayo",
      title: "Restaurant Owner",
      company: "Taste of Lagos",
      rating: 5,
      text: "The restaurant management system streamlined our entire operation. From order management to inventory tracking, everything is now automated and efficient. Our staff loves how easy it is to use.",
      project: "Restaurant Management System",
      result: "35% improvement in order processing time"
    },
    {
      id: 6,
      name: "Dr. Funmi Adeola",
      title: "Medical Director",
      company: "HealthCare Plus",
      rating: 5,
      text: "The appointment booking platform has revolutionized how we manage patient interactions. Reduced no-shows, better patient experience, and streamlined operations. Exactly what we needed for modern healthcare delivery.",
      project: "Healthcare Appointment System",
      result: "35% reduction in no-shows"
    }
  ];

  const stats = [
    { number: "100%", label: "Client Satisfaction Rate" },
    { number: "50+", label: "Successful Projects" },
    { number: "300%", label: "Average ROI Increase" },
    { number: "24/7", label: "Support Available" }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <main className="min-h-screen bg-brand-white text-brand-black">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">Client Success Stories</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Hear from our satisfied clients and discover how Object Technologies has helped businesses 
            across Nigeria and Africa succeed with modern digital solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="card">
                <div className="text-3xl font-bold text-brand-orange mb-2">{stat.number}</div>
                <div className="text-brand-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">What Our Clients Say</h2>
            <p className="text-section-subtitle">Real feedback from real businesses</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card card-hover">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-orange font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-brand-black">{testimonial.name}</div>
                    <div className="text-brand-gray-600 text-sm">{testimonial.title}</div>
                    <div className="text-brand-orange text-sm font-medium">{testimonial.company}</div>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Quote */}
                <div className="text-brand-orange text-2xl mb-3">"</div>
                <p className="text-brand-gray-700 mb-4 leading-relaxed italic">
                  {testimonial.text}
                </p>

                {/* Project Details */}
                <div className="bg-brand-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-brand-gray-700">Project:</span>
                    <span className="text-brand-orange">{testimonial.project}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-brand-gray-700">Result:</span>
                    <span className="text-green-600 font-medium">{testimonial.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Why Clients Choose Us</h2>
            <p className="text-section-subtitle">The values that drive our client relationships</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Results-Driven</h3>
              <p className="text-brand-gray-600">
                Every project is measured by concrete outcomes. We don't just deliver solutions; 
                we deliver measurable business growth.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Partnership Approach</h3>
              <p className="text-brand-gray-600">
                We treat every client's business as our own. Your success is our success, 
                and we're committed for the long term.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-brand-orange mb-3">Fast & Reliable</h3>
              <p className="text-brand-gray-600">
                Quick turnaround times without compromising quality. Plus ongoing support 
                to ensure your solutions keep performing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h2 className="text-section-title text-brand-white mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create your own success story. Join the growing list of businesses 
            that trust Object Technologies for their digital transformation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/login" className="btn-primary bg-brand-white text-brand-orange hover:bg-brand-gray-100">
              Start Your Project
            </a>
            <a href="/#contact" className="btn-outline border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-orange">
              Get Free Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
