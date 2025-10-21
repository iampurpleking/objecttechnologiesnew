"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { supabase } from "../../utils/supabaseClient";

function getStatusColor(status: string) {
  switch (status) {
    case "Completed": return "bg-green-100 text-green-800";
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "Planning": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (e: any) {
        setError(e?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-brand-white text-brand-black px-2 md:px-0">
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white px-2 md:px-0">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">Our Projects Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our successful projects and innovative solutions
          </p>
        </div>
      </section>

      <section className="section-padding px-2 md:px-0">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-brand-orange">Featured Projects</h2>
            <p className="text-section-subtitle">Success stories that showcase our expertise</p>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading ? (
            <div>Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {projects.length === 0 ? (
                <div className="text-brand-gray-500">No projects found.</div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="card">
                    <h3 className="text-2xl font-bold text-brand-orange mb-3">{project.name}</h3>
                    <p className="text-brand-gray-700 mb-4">{project.client}</p>
                    {project.description && (
                      <div className="mb-2">
                        <strong>Description:</strong> <span className="text-brand-gray-700">{project.description}</span>
                      </div>
                    )}
                    {project.features && (
                      <div className="mb-2">
                        <strong>Features:</strong> <span className="text-brand-gray-700">{project.features}</span>
                      </div>
                    )}
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(project.status)} mb-2`}>{project.status}</span>
                    <div className="progress-bar mb-2">
                      <div className="progress-fill" style={{ ['--w' as any]: `${project.progress}%`, width: 'var(--w)' }}></div>
                    </div>
                    <p className="text-brand-gray-500 text-sm">Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white px-2 md:px-0">
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
