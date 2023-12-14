import React from 'react'
import { Card, Space } from 'antd';
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import * as STRING from "../../strings";



export const PopUpInfoBox = () => {

    const getActivePanel = useSelector((state) => state.select.panelInfo.activePanel);
    const getDuration = useSelector((state) => state.select.routingInfo.duration);
    const getDistance = useSelector((state) => state.select.routingInfo.distance);

    return (
        
        <div className='merchant-card'>
            <Card
                size="small"
                title="Routing Information"
            >
                <div
                    style={{
                        textAlign: "center",
                        font: "bold"
                    }}>
                    <p><strong>Duration:   {getDuration}</strong> </p>
                    <p><strong>Distance:   {getDistance} KM</strong></p>
                </div>


            </Card>
        </div>
    );
}
