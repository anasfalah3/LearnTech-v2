import { Link } from "react-router-dom"
import Layout from "../../common/Layout"
import UserSidebar from "../../common/UserSidebar"
import EditCourse from "../../common/EditCourse"
import { apiUrl, token } from "../../common/Config"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function MyCourses() {
      const [courses, setCourses] = useState([]);
      const fetchCorses = async () => {
            await fetch(`${apiUrl}/my-courses`, {
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
                              setCourses(result.courses);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      const deleteCourse = async (id) => {
            if (confirm("Are you sure you want to delete this Course?")) {
                  await fetch(`${apiUrl}/courses/${id}`, {
                        method: "DELETE",
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
                                    const newCourses = courses.filter(course => course.id != id);
                                    setCourses(newCourses);
                                    toast.success(result.message);
                              } else {
                                    console.log("somthing went wrong")
                              }
                        })
            }
      }

      useEffect(() => {
            fetchCorses();
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
                                                <li className="breadcrumb-item active" aria-current="page">My Courses</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      My Courses
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>Manage your Courses information, such as title, description, and image.</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <section className='section-4'>
                              <div className='container'>
                                    <div className='row'>
                                          <div className='col-md-12 mt-5 mb-3'>
                                                <div className='d-flex justify-content-between'>
                                                      <h2 className='h4 mb-0 pb-0'>My Courses</h2>
                                                      <Link to="/account/courses/create" className='btn btn-primary'>Create</Link>
                                                </div>
                                          </div>
                                          <div className='col-lg-3 account-sidebar'>
                                                <UserSidebar />
                                          </div>
                                          <div className='col-lg-9'>
                                                <div className='row gy-4'>
                                                      {
                                                            courses && courses.map((course, index) => {
                                                                  return (
                                                                        <EditCourse course={course} key={index} deleteCourse={deleteCourse} />
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

export default MyCourses