import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/Home'
import CoursesList from './pages/students/CoursesList'
import CourseDetails from './pages/students/CourseDetails'
import MyEnrollments from './pages/students/MyEnrollments'
import Player from './pages/students/Player'
import Loading from './components/students/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/students/Navbar'
import 'quill/dist/quill.snow.css';


function App() {
  const isEducator=useMatch('/educator/*');
  return (
    <div className='text-gray-900 min-h-screen'>

      {!isEducator && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/courses-list' element={<CoursesList/>} />
        <Route path='/courses-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />

        <Route path='/educator'element={<Educator/>} >
            <Route path='/educator'element={<Dashboard/>} />
            <Route path='add-course'element={<AddCourse/>} />
            <Route path='my-courses'element={<MyCourses/>} />
            <Route path='students-enrolled'element={<StudentsEnrolled/>} />

        </Route>

      </Routes>
    </div>
  )
}

export default App