import { useEffect, useState } from "react";

import Layout from "../common/Layout"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
import { apiUrl, convertMinutesToHours, token } from "../common/Config";
import Loading from "../common/Loading";
import NotFound from "../common/NotFound";
import FreePreview from "../common/FreePreview";
import toast from 'react-hot-toast';


function Detail() {
      const params = useParams();
      const [course, setCourse] = useState(null);
      const [loading, setLoading] = useState(true);
      const [freeLesson, setFreeLesson] = useState(null);
      const navigate = useNavigate();

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = (lesson) => {
            setShow(true)
            setFreeLesson(lesson);
      };


      // new
      const [openChapter, setOpenChapter] = useState(0);



      const fetchCourse = () => {
            setLoading(true);
            fetch(`${apiUrl}/fetch-course/${params.id}`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                  },

            })
                  .then(res => res.json())
                  .then(result => {
                        setLoading(false);
                        console.log(result.data);
                        if (result.status == 200) {
                              setCourse(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }
      const enrollCourse = async () => {
            var data = {
                  course_id: course.id,
            }
            await fetch(`${apiUrl}/enroll-course`, {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(data)
            })
                  .then(async res => {
                        const result = await res.json();
                        return {
                              status: res.status,
                              data: result
                        }
                  })
                  .then(({ status, data }) => {
                        console.log(data);
                        if (status == 200) {
                              toast.success(data.message)
                        } else if (status == 401) {
                              toast.error("please login first to enroll in this course")
                              navigate('/account/login')
                        }
                        else {
                              toast.error(data.message)
                        }
                  })
      }

      useEffect(() => {
            fetchCourse();
      }, [])
      return (
            <Layout>
                  {
                        freeLesson && <FreePreview show={show} handleClose={handleClose} freeLesson={freeLesson} />
                  }
                  {loading && <div className="mt-5"><Loading /></div>}
                  {!loading && !course && <NotFound />}
                  {!loading && course && (
                        <>
                              {/* ── HERO BAND ── */}
                              <div className="detail-hero">
                                    <div className="container position-relative">
                                          {/* Breadcrumb */}
                                          <nav aria-label="breadcrumb" className="mb-3">
                                                <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                                      <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                                                      <li className="breadcrumb-item active">{course.title}</li>
                                                </ol>
                                          </nav>

                                          <div className="row align-items-start g-4">
                                                <div className="col-lg-8">
                                                      <div className="hero-badge"><i className="bi bi-grid me-1"></i>{course.category.name}</div>
                                                      <h1 className="fw-bold text-white mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.25 }}>
                                                            {course.title}
                                                      </h1>
                                                      <p style={{ color: "#94a3b8", maxWidth: 600, fontSize: "0.95rem" }}>{course.description?.slice(0, 140)}…</p>

                                                      {/* Rating row */}
                                                      <div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
                                                            <span className="fw-bold text-warning">{course.rating}</span>
                                                            <Rating readonly initialValue={course.rating} size={18} />
                                                            <span style={{ color: "#64748b", fontSize: "0.82rem" }}>({course.reviews.length} reviews)</span>
                                                            <span style={{ color: "#64748b", fontSize: "0.82rem" }}>· {course.enrollments_count.toLocaleString()} students</span>
                                                      </div>

                                                      {/* Meta pills */}
                                                      <div className="d-flex flex-wrap gap-2">
                                                            <span className="meta-pill"><i className="bi bi-bar-chart-steps"></i>{course.level.name}</span>
                                                            <span className="meta-pill"><i className="bi bi-translate"></i>{course.language.name}</span>
                                                            <span className="meta-pill"><i className="bi bi-collection-play"></i>{course.total_lessons} lectures</span>
                                                            <span className="meta-pill"><i className="bi bi-clock"></i>{convertMinutesToHours(course.total_duration)}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* ── BODY ── */}
                              <div className="container py-5">
                                    <div className="row g-4 align-items-start">

                                          {/* ── LEFT COLUMN ── */}
                                          <div className="col-lg-8">

                                                {/* What you'll learn */}
                                                <div className="content-card">
                                                      <div className="section-label">Outcomes</div>
                                                      <h3 className="h5 fw-bold mb-3">What You Will Learn</h3>
                                                      <ul className="list-unstyled check-list mb-0">
                                                            {course.outcomes?.map((o, i) => (
                                                                  <li key={i}>
                                                                        <span className="check-icon"><i className="bi bi-check-lg"></i></span>
                                                                        {o.text}
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>

                                                {/* Requirements */}
                                                <div className="content-card">
                                                      <div className="section-label">Prerequisites</div>
                                                      <h3 className="h5 fw-bold mb-3">Requirements</h3>
                                                      <ul className="list-unstyled check-list mb-0">
                                                            {course.requirements?.map((r, i) => (
                                                                  <li key={i}>
                                                                        <span className="check-icon"><i className="bi bi-check-lg"></i></span>
                                                                        {r.text}
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>

                                                {/* Overview */}
                                                <div className="content-card">
                                                      <div className="section-label">About</div>
                                                      <h3 className="h5 fw-bold mb-3">Course Overview</h3>
                                                      <p className="text-muted mb-0" style={{ lineHeight: 1.8, fontSize: "0.93rem" }}>{course.description}</p>
                                                </div>

                                                {/* Course Structure */}
                                                <div className="content-card">
                                                      <div className="section-label">Curriculum</div>
                                                      <h3 className="h5 fw-bold mb-1">Course Structure</h3>
                                                      <p className="text-muted mb-4" style={{ fontSize: "0.85rem" }}>
                                                            <i className="bi bi-journals me-1 text-primary"></i>{course.chapters_count} chapters &nbsp;·&nbsp;
                                                            <i className="bi bi-play-btn me-1 text-primary"></i>{course.total_lessons} lectures &nbsp;·&nbsp;
                                                            <i className="bi bi-clock me-1 text-primary"></i>{convertMinutesToHours(course.total_duration)} total
                                                      </p>

                                                      {course.chapters?.map((chapter, ci) => (
                                                            <div className="chapter-item" key={ci}>
                                                                  <div
                                                                        className={`chapter-header ${openChapter === ci ? "open" : ""}`}
                                                                        onClick={() => setOpenChapter(openChapter === ci ? null : ci)}
                                                                  >
                                                                        <div className="d-flex align-items-center gap-2">
                                                                              <i className={`bi bi-chevron-${openChapter === ci ? "down" : "right"} text-primary`} style={{ fontSize: "0.75rem" }}></i>
                                                                              <span className="fw-semibold" style={{ fontSize: "0.92rem" }}>{chapter.title}</span>
                                                                        </div>
                                                                        <span className="text-muted" style={{ fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                                                                              {chapter.lessons_count} lessons · {convertMinutesToHours(chapter.lessons_sum_duration)}
                                                                        </span>
                                                                  </div>

                                                                  {openChapter === ci && (
                                                                        <div className="chapter-body">
                                                                              {chapter.lessons?.map((lesson, li) => (
                                                                                    <div className="lesson-row" key={li}>
                                                                                          <div className="d-flex align-items-center gap-2">
                                                                                                <i className="bi bi-play-circle text-primary"></i>
                                                                                                <span>{lesson.title}</span>
                                                                                          </div>
                                                                                          <div className="d-flex align-items-center gap-2">
                                                                                                {lesson.is_free_preview === "yes" && (
                                                                                                      <button className="preview-badge" onClick={() => handleShow(lesson)}>
                                                                                                            <i className="bi bi-eye me-1"></i>Preview
                                                                                                      </button>
                                                                                                )}
                                                                                                <span className="text-muted" style={{ fontSize: "0.8rem" }}>{convertMinutesToHours(lesson.duration)}</span>
                                                                                          </div>
                                                                                    </div>
                                                                              ))}
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      ))}
                                                </div>

                                                {/* Reviews */}
                                                <div className="content-card">
                                                      <div className="section-label">Feedback</div>
                                                      <div className="d-flex justify-content-between align-items-center mb-1">
                                                            <h3 className="h5 fw-bold mb-0">Student Reviews</h3>
                                                            <div className="d-flex align-items-center gap-1">
                                                                  <span className="fw-bold text-primary fs-4">{course.rating}</span>
                                                                  <Rating readonly initialValue={course.rating} size={18} />
                                                            </div>
                                                      </div>
                                                      <p className="text-muted mb-4" style={{ fontSize: "0.85rem" }}>Based on {course.reviews.length} reviews</p>

                                                      {course.reviews?.map((review, i) => (
                                                            <div className="review-card" key={i}>
                                                                  <div className="reviewer-avatar">
                                                                        {review.user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                                  </div>
                                                                  <div style={{ flex: 1 }}>
                                                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-1">
                                                                              <div>
                                                                                    <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>{review.user?.name}</span>
                                                                                    <span className="text-muted ms-2" style={{ fontSize: "0.78rem" }}>{review.created_at}</span>
                                                                              </div>
                                                                              <Rating readonly initialValue={review.rating} size={15} />
                                                                        </div>
                                                                        <p className="text-muted mt-1 mb-0" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>{review.comment}</p>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>

                                          </div>

                                          {/* ── RIGHT SIDEBAR ── */}
                                          <div className="col-lg-4">
                                                <div className="sidebar-card">
                                                      <img src={course.course_small_image} alt={course.title} />

                                                      <div className="sidebar-body">
                                                            {/* Price */}
                                                            <div className="d-flex align-items-baseline gap-2 mb-1">
                                                                  <span className="fw-bold" style={{ fontSize: "1.75rem", color: "var(--dark)", fontFamily: "'Sora',sans-serif" }}>
                                                                        ${course.price}
                                                                  </span>
                                                                  {course.cross_price && (
                                                                        <span className="text-muted text-decoration-line-through" style={{ fontSize: "1rem" }}>
                                                                              ${course.cross_price}
                                                                        </span>
                                                                  )}
                                                                  {course.cross_price && (
                                                                        <span className="badge rounded-pill" style={{ background: "#fef9c3", color: "#92400e", fontWeight: 600 }}>
                                                                              {Math.round((1 - course.price / course.cross_price) * 100)}% OFF
                                                                        </span>
                                                                  )}
                                                            </div>
                                                            <p className="text-muted mb-3" style={{ fontSize: "0.78rem" }}>
                                                                  <i className="bi bi-clock-history me-1"></i> Special Offre No Paiment Required This is Beta Version of the Platform
                                                            </p>

                                                            {/* Enroll button */}
                                                            <button onClick={enrollCourse} className="btn btn-enroll mb-2">
                                                                  <i className="bi bi-ticket-perforated me-2"></i>Enroll Now
                                                            </button>

                                                            <p className="text-center text-muted mt-2 mb-0" style={{ fontSize: "0.75rem" }}>
                                                                  30-day money-back guarantee
                                                            </p>

                                                            {/* Divider */}
                                                            <hr style={{ margin: "1.2rem 0" }} />

                                                            {/* Includes */}
                                                            <div className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>This course includes</div>
                                                            {[
                                                                  { icon: "bi-infinity", label: "Full lifetime access" },
                                                                  { icon: "bi-tv", label: "Access on mobile and TV" },
                                                            ].map((item) => (
                                                                  <div className="include-item" key={item.label}>
                                                                        <i className={`bi ${item.icon}`}></i>
                                                                        <span>{item.label}</span>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>

                                    </div>
                              </div>
                        </>
                  )
                  }
            </Layout>
      )
}

export default Detail