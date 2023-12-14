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

            {
                getActivePanel === STRING.ACTIVE_PANEL_ROUTING

                    ?
                    <>
                        <Card
                            size="small"
                            title={STRING.INFORMATION_ROUTING}
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
                    </>

                    :

                    <>
                        <Card
                            size="small"
                            title={STRING.INFORMATION_TRIPPING}
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
                    </>
            }

        </div>
    );
}
