import React, { useState } from 'react'
import { Button, List, Card, Modal } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import {createDay, deleteDay, getDayToolboxAll, getLearningStandard} from '../../../Utils/requests'

import './DayEditor.less'


export default function ContentCreator(props) {
    const [visible, setVisible] = useState(false);
    const [days, setDay] = useState([]);
    const linkBtn = props.linkBtn;
    const learningStandard = props.learningStandard


    const handleCancel = () => {
        setVisible(false)
    };

    const showModal = () => {
        setDay([...props.days])

        setVisible(true)
    };


    const addBasicDay = () => {
        const res = createDay(days.length + 1, learningStandard)
        res.then(function (res1) {
            //console.log(res1)
            setDay([...days, { id: res1.data.id, day: days.length + 1 }])
        })
    }

    const removeBasicDay = (currDay) => {
        if (days.length === 1) {
            setDay([])
        } else {
            const currIndex = days.indexOf(currDay)
            // console.log(days)
            // console.log(currIndex)
            // console.log(currDay)
            if (currIndex === 0) {
                let pos = 0
                setDay(days.forEach(currDay => {
                    if (currIndex === 0 && pos === 0) {
                        currDay.day = -1
                    } else {
                        currDay.day -= 1
                    }
                    pos++;
                }))
                setDay(days.filter((e) => (e.day !== -1)))
            } else {
                let pos = 0
                setDay(days.forEach(currDay => {
                    if (pos > currIndex) {
                        currDay.day -= 1
                    } else if (pos === currIndex) {
                        currDay.day = -1
                    }
                    pos++;
                }))
                setDay(days.filter((e) => (e.day !== -1)))
            }
        }
        const res = deleteDay(currDay.id)
        res.then(function (a) {
            //console.log(res)
        })
    }

    const addButtonStyle = {
        background: "#F4F4F5",
        borderRadius: "20px",
        border: "2px solid #5BABDE",

    }
    const handleViewDay = async day => {
        const res = await getDayToolboxAll();
        day.toolbox = res.data.toolbox;
        day.number = day.day;

        const request = await getLearningStandard(learningStandard);

        day.learning_standard = request.data.name;

        localStorage.setItem("my-day", JSON.stringify(day));
        props.history.push('/day')
    };
    //figure out how to set these up in the css file colors[] stuff causes problems

    return (
        <div>
            {/* {console.log(props)} */}

            <button id={linkBtn ? 'link-btn' : null} onClick={showModal}>View</button>

            <Modal
                title="Learning Standard Days:"
                visible={visible}
                onCancel={handleCancel}
                size="large"

            >
                <div className="list-position">
                    {(days.length > 0) ?
                        <List
                            grid={{ gutter: 16, column: 7 }}
                            dataSource={days}
                            renderItem={item => (
                                <List.Item>
                                    {/* <div id="btn-container" className='flex space-between'>
                            <button key={item.day}>{`Day ${item.day}`}</button>
                        </div> */}
                                    <div className="border-card-info">
                                        <Card key={item.day.id} title={"Day " + item.day + ":"} hoverable="true"
                                             onClick={() => handleViewDay(item)} extra={<Button onClick={() => removeBasicDay(item)} size="small" icon={<CloseOutlined/>}/>}/>
                                    </div>
                                </List.Item>
                            )}
                        /> : null}
                    <div>
                        <Button style={addButtonStyle} onClick={addBasicDay} size="default" icon={<PlusOutlined/>}/>
                    </div>
                </div>


            </Modal></div>


    )

}