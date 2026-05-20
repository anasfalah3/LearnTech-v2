import { useEffect, useState } from "react";
import Course from "../common/Course"
import Layout from "../common/Layout"
import { apiUrl } from "../common/Config";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";
import NotFound from "../common/NotFound";

function Courses() {
      const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
      const [searchParams, setSearchParams] = useSearchParams();
      const [keyword, setKeyword] = useState("");
      const [sort, setSort] = useState("desc");
      const [categories, setCategories] = useState([]);
      const [levels, setLevels] = useState([]);
      const [languages, setLanguages] = useState([]);
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(false);
      const [categoryChecked, setCategoryChecked] = useState(() => {
            const category = searchParams.get('category');
            return category ? category.split(',') : [];
      });
      const [levelChecked, setLevelChecked] = useState(() => {
            const level = searchParams.get('level');
            return level ? level.split(',') : [];
      });
      const [languageChecked, setLanguageChecked] = useState(() => {
            const language = searchParams.get('language');
            return language ? language.split(',') : [];
      });

      const handleCategory = (e) => {
            const { checked, value } = e.target;
            if (checked) {
                  setCategoryChecked((prev) => [...prev, value])
            } else {
                  setCategoryChecked(categoryChecked.filter((id) => id != value));
            }
      }
      const handleLevel = (e) => {
            const { checked, value } = e.target;
            if (checked) {
                  setLevelChecked((prev) => [...prev, value])
            } else {
                  setLevelChecked(levelChecked.filter((id) => id != value));
            }
      }
      const handleLanguage = (e) => {
            const { checked, value } = e.target;
            if (checked) {
                  setLanguageChecked((prev) => [...prev, value])
            } else {
                  setLanguageChecked(languageChecked.filter((id) => id != value));
            }
      }

      const fetchCourses = () => {
            setLoading(true);
            let search = [];
            let params = '';
            if (categoryChecked.length > 0) {
                  search.push(['category', categoryChecked]);
            }
            if (levelChecked.length > 0) {
                  search.push(['level', levelChecked]);
            }
            if (languageChecked.length > 0) {
                  search.push(['language', languageChecked]);
            }
            if (keyword.length > 0) {
                  search.push(['keyword', keyword]);
            }
            search.push(['sort', sort]);

            if (search.length > 0) {
                  params = new URLSearchParams(search);
                  setSearchParams(params)
            } else {
                  setSearchParams([])
            }
            fetch(`${apiUrl}/fetch-courses?${params}`, {
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

      const fetchCategories = () => {
            fetch(`${apiUrl}/fetch-categories`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                  },

            })
                  .then(res => res.json())
                  .then(result => {
                        setLoading(false);
                        if (result.status == 200) {
                              console.log(result.data);
                              setCategories(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }
      const fetchLevels = () => {
            fetch(`${apiUrl}/fetch-levels`, {
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
                              setLevels(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }
      const fetchLanguages = () => {
            fetch(`${apiUrl}/fetch-languages`, {
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
                              setLanguages(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }

      const clearFilters = () => {
            setCategoryChecked([]);
            setLevelChecked([]);
            setLanguageChecked([]);
            setKeyword('');
            setSort('desc');
            document.getElementById('form-check-input').foreach(element => element.checked = false);
      }

      useEffect(() => {
            fetchCategories();
            fetchLevels();
            fetchLanguages();
            fetchCourses();
      }, [categoryChecked, levelChecked, languageChecked, keyword, sort])
      return (
            <Layout>
                  <>
                        {/* ── HERO BAND ── */}
                        <div className="courses-hero">
                              <div className="container position-relative">
                                    <nav aria-label="breadcrumb" className="mb-3">
                                          <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Courses</li>
                                          </ol>
                                    </nav>
                                    <h1 className="fw-bold text-white mb-2" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}>
                                          All Courses
                                    </h1>
                                    <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: 0, maxWidth: 480 }}>
                                          Browse our full library of expert-led courses. Filter by category, level, or language to find your perfect match.
                                    </p>
                              </div>
                        </div>

                        {/* ── BODY ── */}
                        <div style={{ background: "var(--surface)", minHeight: "60vh" }} className="py-4 pb-5">
                              <div className="container">

                                    {/* Mobile filter toggle */}
                                    <div className="d-flex align-items-center gap-2 mb-3 d-lg-none">
                                          <button className="mobile-filter-btn" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
                                                <i className="bi bi-sliders"></i> Filters
                                                {mobileFilterOpen && <i className="bi bi-x ms-1"></i>}
                                          </button>
                                          <span className="results-count">{courses.length} courses found</span>
                                    </div>

                                    <div className="row g-4 align-items-start">

                                          {/* ── SIDEBAR ── */}
                                          <div className={`col-lg-3 filter-sidebar-col ${mobileFilterOpen ? "open" : ""}`}>
                                                <div className="filter-card">
                                                      {/* Search */}
                                                      <div className="filter-section">
                                                            <div className="input-group">
                                                                  <input
                                                                        onChange={(e) => setKeyword(e.target.value)}
                                                                        value={keyword}
                                                                        type="text"
                                                                        className="form-control filter-input"
                                                                        placeholder="Search courses…"
                                                                  />
                                                                  <button className="btn btn-primary" style={{ borderRadius: "0 100px 100px 0", paddingInline: "1rem" }}>
                                                                        <i className="bi bi-search"></i>
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      {/* Category */}
                                                      <div className="filter-section">
                                                            <div className="filter-label">Category</div>
                                                            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                                                                  {categories?.map((category) => (
                                                                        <li key={category.id}>
                                                                              <label className="filter-check-label">
                                                                                    <input
                                                                                          defaultChecked={searchParams.get("category") ? searchParams.get("category").includes(category.id) : false}
                                                                                          onClick={(e) => handleCategory(e)}
                                                                                          className="form-check-input me-2"
                                                                                          type="checkbox"
                                                                                          value={category.id}
                                                                                    />
                                                                                    {category.name}
                                                                              </label>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </div>

                                                      {/* Level */}
                                                      <div className="filter-section">
                                                            <div className="filter-label">Level</div>
                                                            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                                                                  {levels?.map((level) => (
                                                                        <li key={level.id}>
                                                                              <label className="filter-check-label">
                                                                                    <input
                                                                                          defaultChecked={searchParams.get("level") ? searchParams.get("level").includes(level.id) : false}
                                                                                          onClick={(e) => handleLevel(e)}
                                                                                          className="form-check-input me-2"
                                                                                          type="checkbox"
                                                                                          value={level.id}
                                                                                    />
                                                                                    {level.name}
                                                                              </label>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </div>

                                                      {/* Language */}
                                                      <div className="filter-section">
                                                            <div className="filter-label">Language</div>
                                                            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                                                                  {languages?.map((language) => (
                                                                        <li key={language.id}>
                                                                              <label className="filter-check-label">
                                                                                    <input
                                                                                          defaultChecked={searchParams.get("language") ? searchParams.get("language").includes(language.id) : false}
                                                                                          onClick={(e) => handleLanguage(e)}
                                                                                          className="form-check-input me-2"
                                                                                          type="checkbox"
                                                                                          value={language.id}
                                                                                    />
                                                                                    {language.name}
                                                                              </label>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </div>

                                                      {/* Clear */}
                                                      <div className="filter-section border-0 pb-2">
                                                            <Link onClick={() => clearFilters()} className="clear-btn">
                                                                  <i className="bi bi-x-circle me-1"></i>Clear All Filters
                                                            </Link>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* ── COURSES GRID ── */}
                                          <div className="col-lg-9">

                                                {/* Toolbar */}
                                                <div className="toolbar">
                                                      <div className="d-flex align-items-center gap-2 flex-wrap">
                                                            <span className="results-count d-none d-lg-block">
                                                                  <span>{courses.length}</span> courses found
                                                            </span>
                                                      </div>
                                                      <div className="d-flex align-items-center gap-2">
                                                            <span className="text-muted" style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>Sort by:</span>
                                                            <select
                                                                  onChange={(e) => setSort(e.target.value)}
                                                                  value={sort}
                                                                  className="sort-select"
                                                            >
                                                                  <option value="desc">Newest First</option>
                                                                  <option value="asc">Oldest First</option>
                                                            </select>
                                                      </div>
                                                </div>

                                                {/* Grid */}
                                                <div className="row gy-4">
                                                      {loading && <Loading />}
                                                      {!loading && courses && courses.map((course, index) => (
                                                            <Course key={index} course={course} customClasses="col-lg-4 col-md-6" />
                                                      ))}
                                                      {!loading && courses.length === 0 && <NotFound />}
                                                </div>

                                                {/* Pagination */}
                                                {!loading && courses.length > 0 && (
                                                      <></>
                                                      // <div className="d-flex justify-content-center mt-5">
                                                      //       <nav>
                                                      //             <ul className="pagination mb-0" style={{ gap: 4 }}>
                                                      //                   <li className="page-item">
                                                      //                         <a className="page-link" href="#" style={{ borderRadius: 100, border: "1.5px solid #e2e8f0", color: "#64748b", padding: "6px 14px" }}>
                                                      //                               <i className="bi bi-chevron-left" style={{ fontSize: "0.75rem" }}></i>
                                                      //                         </a>
                                                      //                   </li>
                                                      //                   {[1, 2, 3].map((p) => (
                                                      //                         <li key={p} className={`page-item ${p === 1 ? "active" : ""}`}>
                                                      //                               <a className="page-link" href="#" style={{ borderRadius: 100, border: "1.5px solid #e2e8f0", padding: "6px 14px", ...(p === 1 ? { background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" } : { color: "#374151" }) }}>
                                                      //                                     {p}
                                                      //                               </a>
                                                      //                         </li>
                                                      //                   ))}
                                                      //                   <li className="page-item">
                                                      //                         <a className="page-link" href="#" style={{ borderRadius: 100, border: "1.5px solid #e2e8f0", color: "#64748b", padding: "6px 14px" }}>
                                                      //                               <i className="bi bi-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                                                      //                         </a>
                                                      //                   </li>
                                                      //             </ul>
                                                      //       </nav>
                                                      // </div>
                                                )}

                                          </div>
                                    </div>
                              </div>
                        </div>
                  </>
            </Layout>
      )
}

export default Courses