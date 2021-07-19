import React,{useState} from 'react'
import {Form, Input, Button, Modal, List, Card} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {createUnit, getLearningStandardAll} from '../../../Utils/requests'
import './UnitCreator.less'

export default function UnitCreator(props){
    const [visible, setVisible] = useState(false);
    const [visibleSelectDay, setVisibleSelectDay] = useState(false);
    // const [visibleAddLessonDetails, setVisibleAddLessonDetails] = useState(false);
    const unitDefaultState = {
        unitName: "",
        unitGrade: "",
        unitNumber: "",
        unitDescrip: "",
        unitTeksId: "",}

    const [unitObject, setUnitObject] = useState(unitDefaultState)


    const showModal = () => {
        setVisible(true)
    };


    const handleCancel = () => {
        setVisible(false)
    };


    const completeUnitCreation = () => {
        setVisible(false)
    }
 
    const addButtonStyle={
        background: "#F4F4F5",
        borderRadius: "20px",
        border: "2px solid #5BABDE",
        left: '500px',
    }

     const onClickHandler= async()=>{
        //console.log(getLearningStandard(1))
        console.log(unitObject)
        
        await createUnit(unitObject.unitNumber,unitObject.unitName,unitObject.unitTeksId,unitObject.unitDescrip,unitObject.unitGrade)
        setUnitObject({...unitDefaultState})
        completeUnitCreation()
    }

    const unitNameOnChange = (e) => { 
        const {value} = e.target; 
        setUnitObject((unitObject) => ({
        ...unitObject,
        unitName: value
        }));
        console.log(value);
    }
    
    const unitGradeOnChange = (e) => {
        const {value} = e.target; 
        setUnitObject((unitObject) => ({
            ...unitObject,
            unitGrade: value
         }));
    }

    const unitNumberOnChange = (e) => {  
        const {value} = e.target; 
        setUnitObject((unitObject) => ({
            ...unitObject,
            unitNumber: value
        }));
    }
    
    const unitDescripOnChange = (e) => { 
        const {value} = e.target; 
        setUnitObject((unitObject) => ({
            ...unitObject,
            unitDescrip: value
        }));
    }

    const unitTeksIdOnChange = (e) => {
        const {value} = e.target; setUnitObject((unitObject) => ({
            ...unitObject,
            unitTeksId: value
         }));
    }
    
    const setGradeOptions = () => {
        let options = [];
        for(let i = 0; i < props.gradeMenu.length; i++){
            options.push(<option key={i+1} value={props.gradeMenu[i].id}>{props.gradeMenu[i].name}</option>)
        }
        return options
    };
    
    return(
        <div>
            <button onClick={showModal} id="add-unit-btn">
               + Add Unit
            </button>
            <Modal
               title="Create Unit"
               visible={visible}
               onCancel={handleCancel}
               onOk={onClickHandler}
            >
            <Form id="add-units"
            labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 14
              }}
              layout="horizontal"
              size="default">
                  <Form.Item id="form-label" label="Grade">
                    <select id="grade-dropdown" name='grade' defaultValue={unitObject.unitGrade} onChange={unitGradeOnChange}>
                        <option key={0} value={unitObject.unitGrade} disabled id='disabled-option'>Grade</option>
                        {setGradeOptions().map(option => option)}
                    </select>
                    {/* <Input value = {unitObject.unitGrade} /> */}
                </Form.Item>
                <Form.Item id="form-label" label="Unit Name">
                    <Input onChange={unitNameOnChange} value ={unitObject.unitName}/>
                </Form.Item >
                <Form.Item id="form-label" label="Unit Number">
                    <Input onChange={unitNumberOnChange} value = {unitObject.unitNumber}/>
                </Form.Item>
                <Form.Item id="form-label" label="Description">
                    <Input onChange={unitDescripOnChange} value = {unitObject.unitDescrip}/>
                </Form.Item>
                <Form.Item id="form-label" label="TekS">
                    <Input onChange={unitTeksIdOnChange} value = {unitObject.unitTeksId}/>
                </Form.Item>
            </Form>
        </Modal>
        
            </div>
    )
}