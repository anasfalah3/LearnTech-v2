import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import AboutPage from './components/pages/About'
import Courses from './components/pages/Courses'
import Detail from './components/pages/Detail'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import MyCourses from './components/pages/account/MyCourses'
import MyLearning from './components/pages/account/MyLearning'
import WatchCourse from './components/pages/account/WatchCourse'
import ChangePassword from './components/pages/account/ChangePassword'
import Dashboard from './components/pages/account/Dashboard'
import AdminDashboard from './components/pages/account/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import RequireAuth from './components/common/RequireAuth'
import AdminRequireAuth from './components/common/AdminRequireAuth'
import GuestOnly from './components/common/GuestOnly'
import CreateCourse from './components/pages/account/courses/CreateCourse'
import EditCourse from './components/pages/account/courses/EditCourse'
import EditLesson from './components/pages/account/courses/EditLesson'
import LeaveRating from './components/pages/account/courses/LeaveRating'
import Profile from './components/pages/account/Profile'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/account/login" element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          } />
          <Route path="/account/register" element={
            <GuestOnly>
              <Register />
            </GuestOnly>
          } />
          <Route path="/account/my-courses" element={
            <RequireAuth>
              <MyCourses />
            </RequireAuth>
          } />
          <Route path="/account/my-learning" element={
            <RequireAuth>
              <MyLearning />
            </RequireAuth>
          } />
          <Route path="/account/watch-course/:id" element={
            <RequireAuth>
              <WatchCourse />
            </RequireAuth>
          } />
          <Route path="/account/leave-rating/:id" element={
            <RequireAuth>
              <LeaveRating />
            </RequireAuth>
          } />
          <Route path="/account/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path="/account/change-password" element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>
          } />
          <Route path="/account/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/account/admin-dashboard" element={
            <AdminRequireAuth>
              <AdminDashboard />
            </AdminRequireAuth>
          } />
          <Route path="/account/courses/create" element={
            <RequireAuth>
              <CreateCourse />
            </RequireAuth>
          } />
          <Route path="/account/courses/edit/:id" element={
            <RequireAuth>
              <EditCourse />
            </RequireAuth>
          } />
          <Route path="/account/courses/edit-lesson/:id/:courseId" element={
            <RequireAuth>
              <EditLesson />
            </RequireAuth>
          } />

        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
