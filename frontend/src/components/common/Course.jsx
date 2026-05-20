import { Link } from "react-router-dom"

function StarRating({ rating }) {
      return (
            <span className="text-warning small">
                  {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
                  <span className="text-muted ms-1">({rating})</span>
            </span>
      );
}

function Course({ course, customClasses }) {
      return (

            <div className={customClasses}>
                  <div className="card h-100 border-0 shadow-sm course-card overflow-hidden">

                        {/* Course Image */}
                        <div className="position-relative">
                              {course.course_small_image ? (
                                    <img
                                          src={course.course_small_image}
                                          alt={course.title}
                                          className="img-fluid w-100"
                                          style={{ height: "180px", objectFit: "cover" }}
                                    />
                              ) : (
                                    <img
                                          src={`https://placehold.co/600x350?text=${course.title}`}
                                          alt={course.title}
                                          className="img-fluid w-100"
                                          style={{ height: "180px", objectFit: "cover" }}
                                    />
                              )}

                        </div>

                        {/* Card Body */}
                        <div className="card-body d-flex flex-column">
                              {/* Level Badge */}
                              <span className="badge bg-primary align-self-start mb-2">
                                    {course.level?.name}
                              </span>
                              {/* Course Title */}
                              <h6
                                    className="fw-semibold mb-2"
                                    style={{
                                          lineHeight: "1.4",
                                          minHeight: "45px",
                                    }}
                              >
                                    {course.title}
                              </h6>

                              {/* Stats */}
                              <div className="d-flex align-items-center gap-3 text-muted small mb-3">
                                    {/* Level */}
                                    <div className="d-flex align-items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                fill="currentColor"
                                                className="bi bi-bookmark-fill"
                                                viewBox="0 0 16 16"
                                          >
                                                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                                          </svg>

                                          <span className="ms-1">{course?.level?.name}</span>
                                    </div>

                                    {/* Students */}
                                    <div className="d-flex align-items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                fill="currentColor"
                                                className="bi bi-people"
                                                viewBox="0 0 16 16"
                                          >
                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4M4.5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                          </svg>

                                          <span className="ms-1">
                                                {course?.enrollments_count || 0}
                                          </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="d-flex align-items-center">
                                          <StarRating rating={course?.rating || 0} />
                                    </div>
                              </div>

                              {/* Spacer */}
                              <div className="mt-auto"></div>

                              {/* Footer */}
                              <div className="d-flex justify-content-between align-items-center bg-white border-0">
                                    <div className="fw-bold text-primary">
                                          {course.price ? `$${course.price}` : "Free"}
                                    </div>

                                    <Link
                                          to={`/detail/${course.id}`}
                                          className="btn btn-outline-primary btn-sm"
                                    >
                                          Read More
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Course