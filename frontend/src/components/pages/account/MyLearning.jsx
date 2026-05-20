import { useEffect, useState } from "react";
import { apiUrl, token } from "../../common/Config"
import CourseEnrolled from "../../common/CourseEnrolled"
import Layout from "../../common/Layout"
import UserSidebar from "../../common/UserSidebar"
import { Link } from "react-router-dom";

function MyLearning() {
      const [enrollments, setEnrollments] = useState([]);

      const fetchEnrollments = async () => {
            await fetch(`${apiUrl}/enrollments`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
            })
                  .then(res => res.json())
                  .then(result => {
                        console.log(result)
                        if (result.status == 200) {
                              setEnrollments(result.data);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      useEffect(() => {
            fetchEnrollments();
      }, [])

      return (
            <Layout>
                  <>
                        {/* ── HERO BAND ── */}
                        <div className="dash-hero">
                              <div className="container position-relative">
                                    <nav aria-label="breadcrumb" className="mb-3">
                                          <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                <li className="breadcrumb-item"><Link to="#">Account</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">My Learning</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      My Learning
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>Consult your enrolled courses, and start learning</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <section className='section-4'>
                              <div className='container'>
                                    <div className='row'>
                                          <div className='d-flex justify-content-between  mt-5 mb-3'>
                                                <h2 className='h4 mb-0 pb-0'>My Learning</h2>
                                                {/* <a href="#" className='btn btn-primary'>Create</a> */}
                                          </div>
                                          <div className='col-lg-3 account-sidebar'>
                                                <UserSidebar />
                                          </div>
                                          <div className='col-lg-9'>
                                                <div className='row gy-4'>
                                                      {
                                                            enrollments && enrollments.map((enrollment, index) => {
                                                                  return (
                                                                        <CourseEnrolled enrollment={enrollment} key={index} />
                                                                  )
                                                            })
                                                      }
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </>
            </Layout>
      )
}

export default MyLearning