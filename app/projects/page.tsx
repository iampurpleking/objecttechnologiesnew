import Footer from "../../components/Footer";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-brand-white text-brand-black">
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">Our Projects Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our successful projects and innovative solutions
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Featured Projects</h2>
            <p className="text-section-subtitle">Success stories that showcase our expertise</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card">
              <h3 className="text-2xl font-bold text-brand-orange mb-3">TechMart Nigeria</h3>
              <p className="text-brand-gray-700 mb-4">
                Complete e-commerce solution with payment integration and mobile design.
              </p>
              <div className="text-sm text-brand-gray-600">
                <strong>Results:</strong> 400% increase in online sales
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-brand-orange mb-3">MediConnect</h3>
              <p className="text-brand-gray-700 mb-4">
                Telemedicine platform connecting patients with doctors across Nigeria.
              </p>
              <div className="text-sm text-brand-gray-600">
                <strong>Results:</strong> 10,000+ registered users
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h2 className="text-section-title text-brand-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us discuss how we can transform your business.
          </p>
          <a href="/login" className="btn-primary bg-brand-white text-brand-orange hover:bg-brand-gray-100">
            Start Your Project
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
