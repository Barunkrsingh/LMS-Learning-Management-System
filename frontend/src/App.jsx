
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Department from './department/Department';
import Attendance from './department/components/attendance/Attendance';
import Dashboard from './department/components/dashboard/Dashboard';
import Examinations from './department/components/examinations/Examinations';
import Notice from './department/components/notice/Notice';
import Schedule from './department/components/schedule/Schedule';
import Students from './department/components/students/Students';
import Semester from './department/components/semester/Semester';
import Subjects from './department/components/subjects/Subjects';
import Teachers from './department/components/teachers/Teachers';
import Client from './client/Client';
import Home from './client/components/home/Home';
import Login from './client/components/login/Login';
import Register from './client/components/register/Register';
import Teacher from './teacher/Teacher';
import TeacherDetails from './teacher/components/teacher details/TeacherDetails';
import AttendanceTeacher from './teacher/components/attendance/AttendanceTeacher';
import ExaminationsTeacher from './teacher/components/examinations/ExaminationsTeacher';
import NoticeTeacher from './teacher/components/notice/NoticeTeacher';
import ScheduleTeacher from './teacher/components/schedule/ScheduleTeacher';
import Student from './student/Student';
import StudentDetails from './student/components/student details/StudentDetails';
import ScheduleStudent from './student/components/schedule/ScheduleStudent';
import AttendanceStudent from './student/components/attendance/AttendanceStudent';
import ExaminationsStudent from './student/components/examinations/ExaminationsStudent';
import NoticeStudent from './student/components/notice/NoticeStudent';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* DEPARTMENT ROUTE */}
           <Route path='department' element={<Department/>}>
             <Route index element={<Dashboard/>}/>
             <Route path='dashboard' element={<Dashboard/>}/>
             <Route path='attendance' element={<Attendance/>}/>
             <Route path='semester' element={<Semester/>}/>
             <Route path='examinations' element={<Examinations/>}/>
             <Route path='notice' element={<Notice/>}/>
             <Route path='schedule' element={<Schedule/>}/>
             <Route path='students' element={<Students/>}/>
             <Route path='subjects' element={<Subjects/>}/>
             <Route path='teachers' element={<Teachers/>}/>
           </Route>

        {/* STUDENT */}
        <Route path="student" element={<Student/>}>
        <Route index element={<StudentDetails/>}/>
        <Route path="schedule" element={<ScheduleStudent/>}/>
        <Route path="attendance" element={<AttendanceStudent/>}/>
        <Route path="examinations" element={<ExaminationsStudent/>}/>
        <Route path="notice" element={<NoticeStudent/>}/>


           </Route>

        {/* TEACHER */}
        <Route path="teacher" element={<Teacher/>}>
        <Route index element={<TeacherDetails/>}/>
        <Route path="schedule" element={<ScheduleTeacher/>}/>
        <Route path="attendance" element={<AttendanceTeacher/>}/>
        <Route path="examinations" element={<ExaminationsTeacher/>}/>
        <Route path="notice" element={<NoticeTeacher/>}/>
        </Route>

        {/* CLIENT */}
          <Route path="/" element={<Client />}>
           <Route index element={<Home />}/>
           <Route path="login" element={<Login />}/>
           <Route path="register" element={<Register />}/>


           </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
