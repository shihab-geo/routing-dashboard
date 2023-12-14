import React from 'react'
import { Card } from 'antd';
import "./index.css";
import { useSelector } from "react-redux";
import * as STRING from "../../strings";



export const PopUpInfoBox = (props) => {

    const getActivePanel = useSelector((state) => state.select.panelInfo.activePanel);

    const getRoutingDuration = useSelector((state) => state.select.routeInfo.duration);
    const getRoutingDistance = useSelector((state) => state.select.routeInfo.distance);

    const getTrippingDuration = useSelector((state) => state.select.tripInfo.duration);
    const getTrippingDistance = useSelector((state) => state.select.tripInfo.distance);


    return (

        <div className='merchant-card'>

            {
                getActivePanel === STRING.ACTIVE_PANEL_ROUTING

                    ?
                    <>
                        <Card
                            size="small"
                            title={STRING.INFORMATION_ROUTE}
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
                            title={STRING.INFORMATION_TRIP}
                        >
                            <div
                                style={{
                                    textAlign: "center",
                                    font: "bold"
                                }}>
                                <p><strong>Duration:   {getTrippingDuration}</strong> </p>
                                <p><strong>Distance:   {getTrippingDistance} KM</strong></p>
                            </div>


                        </Card>
                    </>
            }

        </div>
    );
}
