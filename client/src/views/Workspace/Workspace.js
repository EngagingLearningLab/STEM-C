import React, { useEffect, useState } from 'react';
import { getDayToolbox } from '../../Utils/requests.js';
import BlocklyCanvasPanel from '../../components/DayPanels/BlocklyCanvasPanel/BlocklyCanvasPanel';
import { message } from 'antd';
import NavBar from '../../components/NavBar/NavBar';

export default function Workspace(props) {
  const [day, setDay] = useState({});
  const { handleLogout, history } = props;

  useEffect(() => {
    const localDay = JSON.parse(localStorage.getItem('my-day'));

    if (localDay) {
      if (localDay.toolbox) {
        setDay(localDay);
      } else {
        getDayToolbox(localDay.id).then((res) => {
          if (res.data) {
            let loadedDay = { ...localDay, toolbox: res.data.toolbox };

            localStorage.setItem('my-day', JSON.stringify(loadedDay));
            setDay(loadedDay);
          } else {
            message.error(res.err);
          }
        });
      }
    } else {
      history.goBack();
    }
  }, [history]);

  const handleGoBack = () => {
    console.log('workspace');
    history.goBack();
  };

  return (
    <div className='container flex flex-row nav-padding'>
      <NavBar isStudent={true} />
      <BlocklyCanvasPanel
        day={day}
        lessonName={`${day.learning_standard_name}, Day ${day.number}`}
        handleGoBack={handleGoBack}
        handleLogout={handleLogout}
        isStudent={true}
      />
    </div>
  );
}
