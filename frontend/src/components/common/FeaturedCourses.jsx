import { useEffect, useState } from 'react';
import Course from './Course'
import { apiUrl } from './Config';

function FeaturedCourses() {
      const [courses, setCourses] = useState([]);

      const fetchFeaturedCourses = () => {
            fetch(`${apiUrl}/fetch-featured-courses`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                  },

            })
                  .then(res => res.json())
                  .then(result => {
                        if (result.status == 200) {
                              console.log(result.data);
                              setCourses(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }

      useEffect(() => {
            fetchFeaturedCourses();
      }, [])
      return (
            <section id="courses" className="py-5" style={{ background: "var(--surface)" }}>
                  <div className="container">
                        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
                              <div>
                                    <div className="section-label">Hand-picked</div>
                                    <h2 className="fw-bold mb-1">Featured Courses</h2>
                                    <p className="text-muted mb-0">Expert-led courses to kick-start your learning journey.</p>
                              </div>
                              <a href="/courses" className="btn btn-outline-primary btn-sm px-4" style={{ borderRadius: 100 }}>
                                    View All <i className="bi bi-arrow-right ms-1"></i>
                              </a>
                        </div>
                        <div className="row gy-4">
                              {
                                    courses && courses.map((course, index) => {
                                          return (
                                                <Course
                                                      key={index}
                                                      course={course}
                                                      customClasses="col-lg-3 col-md-6"
                                                />
                                          )
                                    })
                              }
                        </div>
                  </div>
            </section>
      )
}

export default FeaturedCourses