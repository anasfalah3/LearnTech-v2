const testimonials = [
      {
            name: "Lena Müller",
            role: "Frontend Developer",
            text: "This platform transformed my career. The courses are practical, up-to-date, and the instructors are world-class.",
            avatar: "LM",
            color: "#6366f1",
      },
      {
            name: "Carlos Mendoza",
            role: "Data Analyst",
            text: "I landed my dream job 3 months after completing the Data Science track. The projects in the curriculum made all the difference.",
            avatar: "CM",
            color: "#0ea5e9",
      },
      {
            name: "Priya Nair",
            role: "UX Designer",
            text: "The design courses here are unlike anything else online. I went from beginner to professional in under 6 months.",
            avatar: "PN",
            color: "#f59e0b",
      },
];
function Testimonials() {
      return (
            <section className="py-5" style={{ background: "#fff" }}>
                  <div className="container">
                        <div className="text-center mb-5">
                              <div className="section-label">Student Stories</div>
                              <h2 className="fw-bold">What Our Students Say</h2>
                              <p className="text-muted">Real outcomes from real learners around the world.</p>
                        </div>
                        <div className="row g-4">
                              {testimonials.map((t, i) => (
                                    <div className="col-md-4" key={i}>
                                          <div className="testimonial-card h-100">
                                                <p className="text-muted mt-3" style={{ fontSize: "0.92rem", position: "relative", zIndex: 1 }}>{t.text}</p>
                                                <div className="d-flex align-items-center gap-2 mt-3">
                                                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>
                                                            {t.avatar}
                                                      </div>
                                                      <div>
                                                            <div className="fw-bold" style={{ fontSize: "0.9rem" }}>{t.name}</div>
                                                            <div className="text-muted" style={{ fontSize: "0.78rem" }}>{t.role}</div>
                                                      </div>
                                                      <div className="ms-auto text-warning small">★★★★★</div>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      )
}

export default Testimonials