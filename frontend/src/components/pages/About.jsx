import Layout from "../common/Layout";

const team = [
      { name: "Anas Falah", role: "CEO & Co-Founder", avatar: "AF", color: "#6366f1", bio: "Full Stack Developer with a passion for creating innovative solutions." },
];

const values = [
      { icon: "bi-unlock", color: "#ede9fe", iconColor: "#7c3aed", title: "Accessibility", desc: "We believe quality education should be available to everyone, everywhere, at any price point." },
      { icon: "bi-award", color: "#dbeafe", iconColor: "#2563eb", title: "Excellence", desc: "Every course is reviewed by our expert team to ensure it meets the highest standards." },
      { icon: "bi-people", color: "#dcfce7", iconColor: "#16a34a", title: "Community", desc: "Learning is better together. We foster a global community of curious, driven learners." },
      { icon: "bi-arrow-repeat", color: "#fef9c3", iconColor: "#ca8a04", title: "Continuous Growth", desc: "The world changes fast. We keep our content current so you're always ahead of the curve." },
];

export default function AboutPage() {
      return (
            <Layout>
                  <style>{`
        
        /* Hero */
        .about-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #1e3a5f 100%);
          padding: 80px 0 90px; position: relative; overflow: hidden;
        }
        .about-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 65% 50%, rgba(99,102,241,0.22) 0%, transparent 65%);
        }
        .hero-badge {
          display: inline-block;
          background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.4);
          color: #a5b4fc; padding: 4px 14px; border-radius: 100px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; margin-bottom: 1.1rem;
        }

        /* Section label */
        .section-label {
          display: inline-block; color: var(--primary);
          font-weight: 700; font-size: 0.75rem;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;
        }

        
        /* Value cards */
        .value-card {
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: var(--card-radius); padding: 1.5rem;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .value-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .value-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 1rem; }

        /* Team cards */
        .team-card {
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: var(--card-radius); padding: 1.75rem 1.5rem;
          text-align: center; transition: box-shadow 0.2s, transform 0.2s;
        }
        .team-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 0.85rem; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; color: #fff; font-family: 'Sora', sans-serif; }
        .team-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
        .team-role { font-size: 0.78rem; color: var(--primary); font-weight: 600; margin-bottom: 0.6rem; }
        .team-bio { font-size: 0.82rem; color: #64748b; line-height: 1.6; }

        /* CTA band */
        .cta-band {
          background: linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%);
          border-radius: 1.5rem; padding: 3.5rem 2rem; color: #fff; text-align: center;
        }

      `}</style>

                  {/* ── HERO ── */}
                  <section className="about-hero">
                        <div className="container position-relative text-center">
                              <div className="hero-badge"><i className="bi bi-info-circle me-1"></i>Our Story</div>
                              <h1 className="fw-bold text-white mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", maxWidth: 680, margin: "0 auto 1rem" }}>
                                    We're on a mission to make<br />
                                    <span style={{ color: "#a5b4fc" }}>great education accessible</span>
                              </h1>
                              <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto 2rem", fontSize: "1rem", lineHeight: 1.75 }}>
                                    LearnTech was founded in 2018 with one belief: that where you're born or how much money you have shouldn't determine what you can learn.
                              </p>
                              <div className="d-flex justify-content-center gap-3 flex-wrap">
                                    <a href="/courses" className="btn px-4 py-2 fw-bold" style={{ background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", color: "#fff", borderRadius: 100, border: "none", boxShadow: "0 4px 18px rgba(79,70,229,0.4)" }}>
                                          Explore Courses
                                    </a>
                                    <a href="#team" className="btn px-4 py-2 fw-semibold" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 100, border: "1.5px solid rgba(255,255,255,0.25)" }}>
                                          Meet the Team
                                    </a>
                              </div>
                        </div>
                  </section>

                  {/* ── MISSION ── */}
                  <section style={{ background: "#fff" }} className="py-5">
                        <div className="container">
                              <div className="row align-items-center g-5">
                                    <div className="col-lg-6">
                                          <div className="section-label">Who We Are</div>
                                          <h2 className="fw-bold mb-3">Built by learners,<br />for learners</h2>
                                          <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                                                LearnTech started as a side project between two engineers who couldn't afford the courses they needed to advance their careers. We built the platform we wished had existed for us.
                                          </p>
                                          <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                                                Today, we work with over 1,200 instructors across 40 countries to deliver courses that are practical, up-to-date, and taught by people actually working in their fields.
                                          </p>
                                          <div className="d-flex flex-wrap gap-3">
                                                {["Practical skills", "Real instructors", "No fluff", "Always current"].map((tag) => (
                                                      <span key={tag} className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill" style={{ background: "#ede9fe", color: "var(--primary)", fontSize: "0.82rem", fontWeight: 600 }}>
                                                            <i className="bi bi-check-circle-fill" style={{ fontSize: "0.7rem" }}></i>{tag}
                                                      </span>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="col-lg-6">
                                          {/* Decorative visual */}
                                          <div style={{ position: "relative", height: 320 }}>
                                                <div style={{ position: "absolute", top: 0, left: 0, right: 40, bottom: 40, borderRadius: "1.5rem", background: "linear-gradient(135deg,#ede9fe,#dbeafe)" }}></div>
                                                <div style={{ position: "absolute", top: 40, left: 40, right: 0, bottom: 0, borderRadius: "1.5rem", background: "linear-gradient(135deg,#0f172a,#1e1b4b)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "2rem" }}>
                                                      {[
                                                            { label: "Completion rate", val: 87, color: "#6366f1" },
                                                            { label: "Student satisfaction", val: 95, color: "#0ea5e9" },
                                                            { label: "Instructor quality", val: 92, color: "#22c55e" },
                                                      ].map((bar) => (
                                                            <div key={bar.label} style={{ width: "100%" }}>
                                                                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                                                                        <span>{bar.label}</span><span style={{ color: "#fff", fontWeight: 700 }}>{bar.val}%</span>
                                                                  </div>
                                                                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 100, height: 7 }}>
                                                                        <div style={{ width: `${bar.val}%`, height: "100%", borderRadius: 100, background: bar.color }}></div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* ── VALUES ── */}
                  <section style={{ background: "var(--surface)" }} className="py-5">
                        <div className="container">
                              <div className="text-center mb-5">
                                    <div className="section-label">What Drives Us</div>
                                    <h2 className="fw-bold mb-2">Our Core Values</h2>
                                    <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>Everything we build and every decision we make comes back to these four principles.</p>
                              </div>
                              <div className="row g-3">
                                    {values.map((v, i) => (
                                          <div className="col-md-6 col-lg-3" key={i}>
                                                <div className="value-card h-100">
                                                      <div className="value-icon" style={{ background: v.color }}>
                                                            <i className={`bi ${v.icon}`} style={{ color: v.iconColor }}></i>
                                                      </div>
                                                      <h5 className="fw-bold mb-2">{v.title}</h5>
                                                      <p className="text-muted mb-0" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>{v.desc}</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* ── TEAM ── */}
                  <section id="team" style={{ background: "var(--surface)" }} className="py-5">
                        <div className="container">
                              <div className="text-center mb-5">
                                    <div className="section-label">The People</div>
                                    <h2 className="fw-bold mb-2">Meet Our Team</h2>
                                    <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>A small, passionate team united by the belief that education changes everything.</p>
                              </div>
                              <div className="row g-4 justify-content-center">
                                    {team.map((member, i) => (
                                          <div className="col-6 col-md-4 col-lg-3" key={i}>
                                                <div className="team-card">
                                                      <div className="team-avatar" style={{ background: member.color }}>{member.avatar}</div>
                                                      <div className="team-name">{member.name}</div>
                                                      <div className="team-role">{member.role}</div>
                                                      <div className="team-bio">{member.bio}</div>
                                                      <div className="d-flex justify-content-center gap-2 mt-3">
                                                            {["linkedin", "twitter"].map((s) => (
                                                                  <a key={s} href={`https://${s}.com`}
                                                                        className="d-flex align-items-center justify-content-center"
                                                                        style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px solid #e2e8f0", color: "#64748b", transition: "all 0.15s" }}
                                                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}
                                                                  >
                                                                        <i className={`bi bi-${s}`} style={{ fontSize: "0.72rem" }}></i>
                                                                  </a>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* ── CTA ── */}
                  <section style={{ background: "#fff" }} className="py-5">
                        <div className="container">
                              <div className="cta-band">
                                    <div className="hero-badge" style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "#e0e7ff" }}>
                                          Join Us
                                    </div>
                                    <h2 className="fw-bold text-white mt-2 mb-2" style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>Ready to start learning?</h2>
                                    <p style={{ color: "#bfdbfe", maxWidth: 460, margin: "0 auto 1.75rem", fontSize: "0.95rem" }}>
                                          Join 50,000+ learners already building skills on LearnTech. First 7 days are on us.
                                    </p>
                                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                                          <a href="/account/login" className="btn btn-light fw-bold px-4" style={{ borderRadius: 100, color: "var(--primary)" }}>
                                                Get Started Free
                                          </a>
                                          <a href="/courses" className="btn fw-semibold px-4" style={{ borderRadius: 100, border: "2px solid rgba(255,255,255,0.4)", color: "#fff" }}>
                                                Browse Courses
                                          </a>
                                    </div>
                              </div>
                        </div>
                  </section>

            </Layout>
      );
}