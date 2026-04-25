import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../../common/Layout'
import UserSidebar from '../../../common/UserSidebar'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../../common/Config';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function EditCourse() {
      const params = useParams();
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
            defaultValues: async () => {
                  await fetch(`${apiUrl}/courses/${params.id}`, {
                        method: "GET",
                        headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${token}`
                        }
                  })
                        .then(res => res.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    reset({
                                          title: result.data.title,
                                          category: result.data.category_id,
                                          level: result.data.level_id,
                                          language: result.data.language_id,
                                          description: result.data.description,
                                          sell_price: result.data.price,
                                          cross_price: result.data.cross_price,
                                    })
                              } else {
                                    console.log("somthing went wrong")
                              }
                        })
            }
      });
      const navigate = useNavigate();
      const [categories, setCategories] = useState([]);
      const [languages, setLanguages] = useState([]);
      const [levels, setLevels] = useState([]);
      const onSubmit = async (data) => {
            await fetch(`${apiUrl}/courses`, {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(data)
            })
                  .then(res => res.json())
                  .then(result => {
                        console.log(result)
                        if (result.status == 200) {
                              navigate('/account/courses/edit/' + result.data.id)
                              toast.success(result.message);
                        } else {
                              toast.error(result.message);
                        }
                  })
      }
      const courseMetaData = async () => {
            await fetch(`${apiUrl}/courses/meta-data`, {
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
                              setCategories(result.categories);
                              setLanguages(result.languages);
                              setLevels(result.levels);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      useEffect(() => {
            courseMetaData();
      }, [])
      return (
            <Layout>
                  <section className='section-4'>
                        <div className='container pb-5 pt-3'>
                              <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                          <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                                          <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                              </nav>
                              <div className='row'>
                                    <div className='col-md-12 mt-5 mb-3'>
                                          <div className='d-flex justify-content-between'>
                                                <h2 className='h4 mb-0 pb-0'>Dashboard</h2>
                                          </div>
                                    </div>
                                    <div className='col-lg-3 account-sidebar'>
                                          <UserSidebar />
                                    </div>
                                    <div className='col-lg-9'>
                                          <div className='row'>

                                                <div className="col-md-7">
                                                      <form onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="card border-0 shadow-lg">
                                                                  <div className="card-body p-4">
                                                                        <h4 className="h5 border-bottom pb-3 mb-3">Course Details</h4>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="title">Title</label>
                                                                              <input type="text"
                                                                                    className={`form-control ${errors.title && "is-invalid"}`}
                                                                                    placeholder='Title'
                                                                                    {...register('title', { required: 'Title is required' })} />
                                                                              {errors.title && <p className='invalid-feedback'>{errors.title.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="category">Category</label>
                                                                              <select
                                                                                    className={`form-select ${errors.category && "is-invalid"}`}
                                                                                    id='category'
                                                                                    {...register('category', { required: 'Category is required' })}>
                                                                                    <option value="">Select a category</option>
                                                                                    {categories && categories.map(category => (
                                                                                          <option value={category.id} key={category.id}>{category.name}</option>
                                                                                    ))}
                                                                              </select>
                                                                              {errors.category && <p className='invalid-feedback'>{errors.category.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="level">Level</label>
                                                                              <select
                                                                                    className={`form-select ${errors.level && "is-invalid"}`}
                                                                                    id='level'
                                                                                    {...register('level', { required: 'Level is required' })}>
                                                                                    <option value="">Select a Level</option>
                                                                                    {levels && levels.map(level => (
                                                                                          <option value={level.id} key={level.id}>{level.name}</option>
                                                                                    ))}
                                                                              </select>
                                                                              {errors.level && <p className='invalid-feedback'>{errors.level.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="language">Language</label>
                                                                              <select
                                                                                    className={`form-select ${errors.language && "is-invalid"}`}
                                                                                    id='language'
                                                                                    {...register('language', { required: 'Language is required' })}>
                                                                                    <option value="">Select a Language</option>
                                                                                    {languages && languages.map(language => (
                                                                                          <option value={language.id} key={language.id}>{language.name}</option>
                                                                                    ))}
                                                                              </select>
                                                                              {errors.language && <p className='invalid-feedback'>{errors.language.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="description">Description</label>
                                                                              <textarea
                                                                                    {...register('description')}
                                                                                    className="form-control"
                                                                                    id="description" rows={5} placeholder='Description'></textarea>
                                                                        </div>
                                                                        <h4 className="h5 border-bottom pb-3 mb-3">Pricing</h4>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="sell-price">Sell Price</label>
                                                                              <input type="text"
                                                                                    className={`form-control ${errors.sell_price && "is-invalid"}`}
                                                                                    placeholder='Sell Price'
                                                                                    id='sell-price'
                                                                                    {...register('sell_price', { required: 'Sell Price is required' })} />
                                                                              {errors.sell_price && <p className='invalid-feedback'>{errors.sell_price.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="cross-price">Cross Price</label>
                                                                              <input type="text"
                                                                                    className="form-control"
                                                                                    placeholder='Cross Price'
                                                                                    id='cross-price'
                                                                                    {...register('cross_price')} />
                                                                              {errors.cross_price && <p className='invalid-feedback'>{errors.cross_price.message}</p>}
                                                                        </div>
                                                                        <button className='btn btn-primary'>Update</button>
                                                                  </div>
                                                            </div>
                                                      </form>
                                                </div>
                                                <div className="col-md-5">

                                                </div>


                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </Layout>
      )
}

export default EditCourse