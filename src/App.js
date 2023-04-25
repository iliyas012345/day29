
import './App.css';

import { useEffect, useState } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import AddStudents from './Components/addstudent';
import DashBoard from './Components/dashboard';
import AddTeachers from './Components/addteachers';
import { StudentsDetails } from './Components/studentdetail';
import { TeacherDetails } from './Components/teacherdetail';
import { StudentProfile } from './Components/studentprofile';
import { TeacherProfile } from './Components/teacherprofile';
import { EditStudents } from './Components/editstudent';
import { EditTeacher } from './Components/editteacher';


function App() {
  const[teachersData,setTeachersData]=useState([])
  const[studentsData,setStudentsData]=useState([])
 
  useEffect(()=>{
       const getStudent = async() => {
        try {
          const response =await fetch ("https://63fde41c19f41bb9f6562d7f.mockapi.io/student" , {
            method:"GET"
          });
          const data =await response.json();
          
          setStudentsData(data)
          
        } catch (error) {
          console.log("Error Occure" , error)
        }
       }

       const getTeacher = async() => {
        try {
          const response = await fetch ("https://63fde41c19f41bb9f6562d7f.mockapi.io/teacher" ,{
            method:"GET"
          });

          const data = await response.json();
          setTeachersData(data)
          
        } catch (error) {
          console.log("Error Occure" , error)
        }
       }
       getStudent(); 
       getTeacher();
  },[])
  

  return (
    <div className="App">
      <Switch>
           <Route path="/dashboard">
              <DashBoard/>
           </Route>
          <Route exact path="/">
            <Redirect to = "/dashboard"/>
           </Route>

           <Route path="/add-student-data">
              <AddStudents
              studentsData={studentsData}
              setStudentsData={setStudentsData}
              
              />
           </Route>
           <Route path="/add-teacher-data">
              <AddTeachers
              teachersData={teachersData}
              setTeachersData={setTeachersData}
              
              />
           </Route>
          <Route path="/students-list">
              <StudentsDetails
              studentsData={studentsData}
              setStudentsData={setStudentsData}
              />
          </Route>
          
          <Route path="/teachers-list">
              <TeacherDetails
              teachersData={teachersData}
              setTeachersData={setTeachersData}
              />
          </Route>
          

          <Route path="/student/:id">
            <StudentProfile
            studentsData={studentsData}
            />
          </Route>

          <Route path="/teacher/:id">
            <TeacherProfile
            teachersData={teachersData}
            />
          </Route>

          <Route path="/editstudent/:id">
            <EditStudents
            studentsData={studentsData}
            setStudentsData={setStudentsData}
            />
          </Route>

          <Route path="/editteacher/:id">
            <EditTeacher
            teachersData={teachersData}
            setTeachersData={setTeachersData}
            />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
