import React from 'react'
import { Card, Space } from 'antd';
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import * as STRING from "../../strings";



export const PopUpInfoBox = () => {

    const getActivePanel = useSelector((state) => state.select.panelInfo.activePanel);

    const getRoutingDuration = useSelector((state) => state.select.routingInfo.duration);
    const getRoutingDistance = useSelector((state) => state.select.routingInfo.distance);

    const getTrippingDuration = useSelector((state) => state.select.trippingInfo.duration);
    const getTrippingDistance = useSelector((state) => state.select.trippingInfo.distance);

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
                    <p><strong>Duration:   {getRoutingDuration}</strong> </p>
                    <p><strong>Distance:   {getRoutingDistance} KM</strong></p>
                </div>


            </Card>
        </div>
    );
}
