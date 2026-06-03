import { useEffect, useState } from "react";
import { apiUrl } from "./Config";
import { Link } from "react-router-dom";

function FeaturedCategories() {
      const [categories, setCategories] = useState([]);

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
                        if (result.status == 200) {
                              setCategories(result.data);
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }

      useEffect(() => {
            fetchCategories();
      }, [])


      return (
            <>
                  <section id="categories" className="py-5" style={{ background: "#fff" }}>
                        <div className="container">
                              <div className="mb-4">
                                    <div className="section-label">Browse</div>
                                    <h2 className="fw-bold mb-1">Explore Top Categories</h2>
                                    <p className="text-muted">Find courses in areas that matter to your career and interests.</p>
                              </div>
                              <div className="row g-3">
                                    {categories.map((cat, i) => {
                                          const colors = ["#ede9fe", "#e0f2fe", "#dcfce7", "#fef9c3", "#fce7f3", "#e0f2fe", "#f3e8ff", "#dbeafe"];
                                          const iconColors = ["#7c3aed", "#0284c7", "#16a34a", "#ca8a04", "#db2777", "#0284c7", "#9333ea", "#2563eb"];
                                          return (
                                                <Link className="col-6 col-md-4 col-lg-3" key={i} to={`/courses?category=${cat.id}`}>
                                                      <div className="cat-card">
                                                            <div className="cat-icon" style={{ background: colors[i % colors.length] }}>
                                                                  <i className="bi bi-tag" style={{ color: iconColors[i % iconColors.length] }}></i>
                                                            </div>
                                                            <div className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>{cat.name}</div>
                                                            <div className="text-muted" style={{ fontSize: "0.78rem" }}>{cat.count}</div>
                                                      </div>
                                                </Link>
                                          );
                                    })}
                              </div>
                        </div>
                  </section>
            </>
      )
}

export default FeaturedCategories