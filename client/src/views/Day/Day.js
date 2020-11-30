import React, {useEffect, useState} from "react"
import BlocklyCanvasPanel from "../../components/DayPanels/BlocklyCanvasPanel/BlocklyCanvasPanel";
import NavBar from "../../components/NavBar/NavBar";
import {getDayToolbox} from "../../Utils/requests";
import {message} from "antd";
import { getUser } from "../../Utils/AuthRequests";


export default function Day(props) {
    const [day, setDay] = useState({});
    const {history} = props;

    const user = getUser();
    const userType = user.role.type;
    let isContentCreator = false;
    let isMentor = false;

    userType === "content_creator" ? isContentCreator = true : isMentor = true;

    useEffect(() => {
        const localDay = JSON.parse(localStorage.getItem("my-day"));

        if (localDay) {
            if (localDay.toolbox) {
                if(isContentCreator){
                    localDay.number = localDay.day
                }

                setDay(localDay)
            } else {
                getDayToolbox(localDay.id).then(res => {
                    if (res.data) {
                        let loadedDay = {...localDay, toolbox: res.data.toolbox};

                        localStorage.setItem("my-day", JSON.stringify(loadedDay));
                        setDay(loadedDay)
                    } else {
                        message.error(res.err);
                    }
                })
            }

        } else {
            history.goBack()
        }
    }, [history]);

    const handleGoBack = () => {
        history.goBack()
    };

    return (
        <div className="container nav-padding">
            <NavBar isMentor={true}/>
            <div className="flex flex-row">
                <BlocklyCanvasPanel
                    day={day}
                    isMentor={isMentor}
                    isContentCreator={isContentCreator}
                    lessonName={`${day.learning_standard}, Day ${day.number}`}
                    handleGoBack={handleGoBack}/>
            </div>
        </div>
    );

}