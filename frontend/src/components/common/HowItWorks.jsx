const steps = [
      { num: "01", icon: "bi-search", title: "Find Your Course", desc: "Browse thousands of courses across dozens of categories and find your perfect match.", color: "#ede9fe", iconColor: "#7c3aed" },
      { num: "02", icon: "bi-person-check", title: "Enroll & Learn", desc: "Sign up, access course materials immediately, and learn at your own pace anytime.", color: "#dbeafe", iconColor: "#2563eb" },
      { num: "03", icon: "bi-pencil", title: "Add Course", desc: "Add your course to our platform and start earning money.", color: "#dcfce7", iconColor: "#16a34a" },
]
function HowItWorks() {
      return (
            <section id="how-it-works" className="py-5" style={{ background: "#fff" }}>
                  <div className="container">
                        <div className="text-center mb-5">
                              <div className="section-label">Simple Process</div>
                              <h2 className="fw-bold">How It Works</h2>
                              <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>Start learning in three easy steps — no experience needed.</p>
                        </div>
                        <div className="row g-4 text-center">
                              {steps.map((step, i) => (
                                    <div className="col-md-4" key={i}>
                                          <div className="step-circle" style={{ background: step.color }}>
                                                <i className={`bi ${step.icon}`} style={{ color: step.iconColor }}></i>
                                          </div>
                                          <div className="text-muted fw-bold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{step.num}</div>
                                          <h5 className="fw-bold">{step.title}</h5>
                                          <p className="text-muted" style={{ maxWidth: 260, margin: "0 auto", fontSize: "0.9rem" }}>{step.desc}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      )
}

export default HowItWorks