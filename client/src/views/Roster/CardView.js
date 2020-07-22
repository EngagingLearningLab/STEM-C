import React from 'react';
import {Card} from "antd";
import StudentModal from "./StudentModal";

export default function CardView(props) {
    const {studentData, onEnrollToggle} = props;

    return(
        <div id='card-container'>
            {studentData.map(student =>
                <Card id='card' title={student.name} key={student.key}>
                    <div id='card-content-container'>
                        <p>Animal: {student.character}</p>
                        <p>Number of Submissions: ###</p>
                        <p>Status: {student.enrolled.enrolled ? 'Enrolled' : 'Unenrolled'}</p>
                    </div>
                    <div id='card-button-container' className='flex flex-row'>
                        <StudentModal student={student} linkBtn={false}/>
                        {/*<button onClick={() => {}}>Edit</button>*/}
                        <button onClick={() => {onEnrollToggle(student.enrolled.id, !student.enrolled.enrolled)}}>
                            {student.enrolled.enrolled ? 'Unenroll' : 'Enroll'}
                        </button>
                    </div>
                </Card>
            )}
        </div>
    )
}
