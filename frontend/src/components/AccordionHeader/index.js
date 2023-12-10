import React from "react";
import 'antd/dist/reset.css';
import '../../index.css';
import { Layout, Select, Collapse, Button, Tabs, DatePicker, TimePicker, Row, Col, Tooltip, AutoComplete, Input } from 'antd';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faLandmark } from '@fortawesome/free-solid-svg-icons'

export const AccordionHeader = props => {

    return (
        <Row>
            <Col className="color-blue-dark" span={21} >
                {props.label}
            </Col>
            <Col span={3} className='align-center'>
                {/* <img src={props.img} alt={props.label} height={24} /> */}
                {/* {props.label !== 'Tracking' ?
                    <FontAwesomeIcon icon={faLandmark} className="color-blue-dark" /> :
                    <FontAwesomeIcon icon={faRoute} className="color-blue-dark" />
                } */}
                <FontAwesomeIcon icon={props.img} className="color-blue-dark" />
            </Col>
        </Row>
    )
}
