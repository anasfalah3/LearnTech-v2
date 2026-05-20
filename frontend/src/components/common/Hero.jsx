import { Link } from 'react-router-dom'
import HeroImg from '../../assets/images/hero-4.png'

function Hero() {
      return (
            <>
                  <section className="hero-section">
                        <div className="container position-relative">
                              <div className="row align-items-center g-5">
                                    <div className="col-lg-6">
                                          <div className="hero-badge"><i className="bi bi-lightning-charge-fill me-1"></i>Over 8,500 courses available</div>
                                          <h1 className="display-4 fw-bold mb-3">Learn Anytime,<br /><span style={{ color: "#a5b4fc" }}>Anywhere.</span></h1>
                                          <p className="lead mb-4" style={{ maxWidth: 480 }}>
                                                Join 50,000+ students on LearnHub. Explore expert-led courses to level up your skills and unlock new opportunities.
                                          </p>
                                          <div className="d-flex flex-wrap gap-3">
                                                <Link to="/courses" className="btn btn-hero-primary">Explore Courses</Link>
                                                <a href="#how-it-works" className="btn btn-hero-outline"><i className="bi bi-play-circle me-2"></i>How it Works</a>
                                          </div>
                                          <div className="d-flex flex-wrap gap-4 mt-4">
                                                {["No credit card required", "Cancel anytime", "24/7 support"].map((t) => (
                                                      <span key={t} className="d-flex align-items-center gap-1" style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                                                            <i className="bi bi-check-circle-fill text-success"></i> {t}
                                                      </span>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-flex justify-content-center">
                                          <div className="col-md-6 text-center" style={{ transform: "scale(2.2) translateY(60px)" }}>
                                                <img src={HeroImg} alt="Student Learning" className="img-fluid " />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </>
      )
}

export default Hero