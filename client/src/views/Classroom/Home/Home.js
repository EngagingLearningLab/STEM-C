import React, { useEffect, useState } from 'react';
import './Home.less';
import { getClassroom, getLearningStandard } from '../../../Utils/requests';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import DisplayCodeModal from './DisplayCodeModal';
import LearningStandardModal from './LearningStandardSelect/LearningStandardModal';
import { message, Modal, Button } from 'antd';

export default function Home(props) {
  const [classroom, setClassroom] = useState({});
  const [gradeId, setGradeId] = useState(null);
  const [activeLearningStandard, setActiveLearningStandard] = useState(null);
  const { classroomId, history, viewing } = props;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClassroom(classroomId);
      if (res.data) {
        const classroom = res.data;
        setClassroom(classroom);
        setGradeId(classroom.grade.id);
        classroom.selections.forEach(async (selection) => {
          if (selection.current) {
            const res = await getLearningStandard(selection.learning_standard);
            if (res.data) setActiveLearningStandard(res.data);
            else {
              message.error(res.err);
            }
          }
        });
      } else {
        message.error(res.err);
      }
    };
    fetchData();
  }, [classroomId]);

  const handleViewDay = (day, name) => {
    day.learning_standard_name = name;
    localStorage.setItem('my-day', JSON.stringify(day));
    history.push('/day');
  };

  const handleBack = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <button id='home-back-btn' onClick={handleBack}>
        <i className='fa fa-arrow-left' aria-hidden='true' />
      </button>
      <DisplayCodeModal code={classroom.code} />
      <MentorSubHeader title={classroom.name}></MentorSubHeader>
      <div id='home-content-container'>
        <div id='active-learning-standard'>
          {activeLearningStandard ? (
            <div>
              <div id='active-learning-standard-title-container'>
                <h3>{`Learning Standard ${activeLearningStandard.number} - ${activeLearningStandard.name}`}</h3>
                <LearningStandardModal
                  history={history}
                  setActiveLearningStandard={setActiveLearningStandard}
                  classroomId={classroomId}
                  gradeId={gradeId}
                  viewing={viewing}
                />
              </div>
              <p id='learning-standard-expectations'>{`Expectations: ${activeLearningStandard.expectations}`}</p>
              <div id='btn-container' className='flex space-between'>
                {activeLearningStandard.days.map((day) => (
                  <div
                    id='view-day-card'
                    key={day.id}
                    onClick={() =>
                      handleViewDay(day, activeLearningStandard.name)
                    }
                  >
                    <h3 id='view-day-title'>{`View Day ${day.number}`}</h3>
                    <div id='view-day-description'>
                      <p>Science Module</p>
                      <p>More infomation here</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                Click the button below to browse available learning standards
              </p>
              <LearningStandardModal
                history={history}
                setActiveLearningStandard={setActiveLearningStandard}
                classroomId={classroomId}
                gradeId={gradeId}
                viewing={viewing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
