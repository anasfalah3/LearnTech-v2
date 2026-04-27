import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)


function EditCover({ course, setCourse }) {
      const [files, setFiles] = useState([]);

      return (
            <>
                  <div className="card shadow-lg border-0 mt-4">
                        <div className="card-body p-4">
                              <div className="d-flex">
                                    <h4 className="h5 border-bottom pb-3 mb-3">Outcome</h4>
                              </div>
                              <FilePond
                                    acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png']}
                                    credits={false}
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    server={{
                                          process: {
                                                url: `${apiUrl}/courses/save-course-image/${course.id}`,
                                                method: 'POST',
                                                headers: {
                                                      'Authorization': `Bearer ${token}`
                                                },
                                                onload: (response) => {
                                                      response = JSON.parse(response);
                                                      toast.success(response.message);
                                                      const updateCourseData = { ...course, cover_image_small: response.data.cover_image_small };
                                                      setCourse(updateCourseData)
                                                      setFiles([]);
                                                },
                                                onerror: (errors) => {
                                                      console.log(errors)
                                                },
                                          },
                                    }}
                                    name="image"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                              />
                              {course.course_small_image && <img src={course.course_small_image} alt="Cover" className="w-100 rounded" />}
                        </div>
                  </div>
            </>
      )
}

export default EditCover