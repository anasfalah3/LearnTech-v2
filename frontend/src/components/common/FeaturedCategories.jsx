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
                              console.log(result.data);
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
            <section className='section-2'>
                  <div className="container">
                        <div className='section-title py-3  mt-4'>
                              <h2 className='h3'>Explore Categories</h2>
                              <p>Discover categories designed to help you excel in your professional and personal growth.</p>
                        </div>
                        <div className='row gy-3'>
                              {
                                    categories && categories.map((category, index) => {
                                          return (
                                                <div className='col-6 col-md-6 col-lg-3' key={index}>
                                                      <div className='card shadow border-0'>
                                                            <div className='card-body'><Link href="">{category.name}</Link></div>
                                                      </div>
                                                </div>
                                          )
                                    })
                              }
                        </div>
                  </div>
            </section>
      )
}

export default FeaturedCategories