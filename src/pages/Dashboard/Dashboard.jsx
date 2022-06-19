import React from 'react'
import { useSelector } from 'react-redux'
import { ADMIN_ROLE, STUDENT_ROLE, TEACHER_ROLE } from '../../constants'
import AdminDashboard from './AdminDashboard'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'
const dummyData={
    role:"teacher"
}

const Dashboard = () => {
    const role=useSelector((state)=>state.Auth.user.role)
    // const role=dummyData.role;
    if(role===ADMIN_ROLE){
        return(<AdminDashboard/>);
    }
    else if(role===TEACHER_ROLE){
        return(<TeacherDashboard/>);
    }
    else if(role===STUDENT_ROLE){
        return(<StudentDashboard/>);
    }
}

export default Dashboard