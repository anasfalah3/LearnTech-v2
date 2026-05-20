import { Link } from 'react-router-dom'
const links = [
      {
            title: "Company", links: [
                  { name: "About Us", url: "#" },
                  { name: "Careers", url: "#" },
            ]
      },
      {
            title: "Learn", links: [
                  { name: "All Courses", url: "/courses" },
                  { name: "Categories", url: "/courses" },
            ]
      },
      {
            title: "Support", links: [
                  { name: "Contact Us", url: "#" },
                  { name: "Privacy Policy", url: "#" },
                  { name: "Terms", url: "#" }
            ]
      },
]
function Footer() {
      return (
            <footer className="py-5">
                  <div className="container">
                        <div className="row g-4 mb-4">
                              <div className="col-lg-4">
                                    <div className="footer-brand mb-2"><i className="bi bi-mortarboard-fill me-2" style={{ color: "#6366f1" }}></i>LearnTech</div>
                                    <p style={{ fontSize: "0.88rem", maxWidth: 280 }}>Empowering learners worldwide with accessible, high-quality education resources.</p>
                                    <div className="d-flex gap-3 mt-3">
                                          {["twitter", "linkedin", "facebook", "instagram"].map((s) => (
                                                <a key={s} href={`https://${s}.com`} className="d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.2s" }}>
                                                      <i className={`bi bi-${s}`} style={{ color: "#94a3b8" }}></i>
                                                </a>
                                          ))}
                                    </div>
                              </div>
                              {links.map((col) => (
                                    <div className="col-6 col-md-4 col-lg-2" key={col.title}>
                                          <h6 className="text-white fw-semibold mb-3">{col.title}</h6>
                                          <ul className="list-unstyled d-flex flex-column gap-2">
                                                {col.links.map((link) => (
                                                      <li key={link.name}><Link to={link.url} style={{ fontSize: "0.88rem" }}>{link.name}</Link></li>
                                                ))}
                                          </ul>
                                    </div>
                              ))}

                        </div>
                        <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                        <div className="d-flex justify-content-between flex-wrap gap-2" style={{ fontSize: "0.82rem" }}>
                              <span>© 2026 LearnTech. All rights reserved.</span>
                              <span>Made by <span style={{ color: "#f472b6" }}>Anas Falah</span></span>
                        </div>
                  </div>
            </footer>
      )
}

export default Footer