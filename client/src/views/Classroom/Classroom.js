import React, {useEffect, useState} from "react"
import {Link} from 'react-router-dom';
import {message, Tabs} from 'antd';
import "./Classroom.less"

import NavBar from "../../components/NavBar/NavBar";
import {getClassroom} from "../../Utils/requests";
import Roster from "./Roster/Roster";
import Home from "./Home/Home";

const {TabPane} = Tabs;

export default function Classroom(props) {
    const [classroom, setClassroom] = useState({});
    const {handleLogout, history, selectedActivity, setSelectedActivity} = props;
    const path = history.location.pathname.split('/');
    const classroomId = parseInt(path[path.length - 1]);
    const hash = history.location.hash.split('#');
    const tab = hash[1];
    const viewing = parseInt(hash[2]);

    useEffect(() => {
        getClassroom(classroomId).then(res => {
            if(res.data) {
                setClassroom(res.data);
            } else {
                message.error(res.err);
            }
        });
    }, [classroomId]);
    console.log(classroom);
    return (
        <div className="container nav-padding">
            <NavBar isMentor={true}/>
            <div id='main-header' className='s'>
                <div id='classroom'>{classroom.name}</div>
                <div id='code'>Join code: {classroom.code}</div>
            </div>
            <Tabs
                defaultActiveKey={tab ? tab : "home"}
                onChange={key => history.push(`#${key}`)}
            >
                <TabPane tab="Home" key="home">
                    <Home classroomId={classroomId} history={history} selectedActivity={selectedActivity}
                          setSelectedActivity={setSelectedActivity} viewing={viewing}/>
                </TabPane>
                <TabPane tab="Roster" key="roster">
                    <Roster history={history} handleLogout={handleLogout} classroomId={classroomId}/>
                </TabPane>
            </Tabs>
            <h2>Student List</h2>
            <ul>
                {classroom.students?.map(student => <li key={student.id}><Link to={`/students/${classroom.id}/${student.id}`}>{student.name}</Link></li>)}
            </ul>
        </div>
    );

}