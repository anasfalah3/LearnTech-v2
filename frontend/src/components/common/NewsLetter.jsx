import { useState } from 'react'

function NewsLetter() {
      const [email, setEmail] = useState("");
      return (
            <section className="py-5" style={{ background: "var(--surface)" }}>
                  <div className="container">
                        <div className="cta-section text-center">
                              <div className="section-label" style={{ color: "#bfdbfe", borderColor: "rgba(191,219,254,0.3)", background: "rgba(255,255,255,0.1)" }}>
                                    Newsletter
                              </div>
                              <h2 className="fw-bold text-white mt-2 mb-2">Start Your Learning Journey</h2>
                              <p className="mb-4" style={{ color: "#bfdbfe", maxWidth: 480, margin: "0 auto 1.5rem" }}>
                                    Subscribe to our newsletter to get the latest updates and exclusive offers
                              </p>
                              <div className="d-flex justify-content-center gap-2 flex-wrap">
                                    <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Enter your email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          style={{ maxWidth: 300, borderRadius: 100, border: "none" }}
                                    />
                                    <button className="btn btn-dark px-4 fw-semibold" style={{ borderRadius: 100 }}>
                                          Subscribe <i className="bi bi-arrow-right ms-1"></i>
                                    </button>
                              </div>
                              <p className="mt-3" style={{ color: "#93c5fd", fontSize: "0.8rem" }}>
                                    <i className="bi bi-shield-check me-1"></i>Your data is safe. We never spam.
                              </p>
                        </div>
                  </div>
            </section>
      )
}

export default NewsLetter