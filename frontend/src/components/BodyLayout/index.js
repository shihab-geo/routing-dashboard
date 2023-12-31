import { React } from 'react';
// import "./index.css";
import { Layout, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { faRoute, faPlane } from '@fortawesome/free-solid-svg-icons'
import { AccordionHeader } from '../AccordionHeader';
import { RoutingInfoPanel } from '../RoutingInfoPanel';
import { TripInfoPanel } from '../TripInfoPanel';
import { ButtonCommon } from '../ButtonCommon';
import { PopUpInfoBox } from '../PopUpInfoBox';
import { Map } from "../Map/map";
import { useDispatch } from "react-redux";
import * as STRING from "../../strings";
import {
    setRoutingDistance, setRoutingDuration,
    setTrippingDistance, setTripingDuration,
    setActivePanel,

} from "../../redux/slices/selectSlice";


const { Sider, Footer } = Layout;
const { Panel } = Collapse;

export const BodyLayout = (props) => {

    const mapRef = props.mapRef;
    const dispatch = useDispatch();


    const buttonClick = (value) => {
        if (mapRef.current === undefined) return;
        mapRef.current.removeAllLayers();

        //Clear the routing info
        dispatch(setRoutingDistance({ data: null }));
        dispatch(setRoutingDuration({ data: null }));

        //Clear the tripping info
        dispatch(setTrippingDistance({ data: null }));
        dispatch(setTripingDuration({ data: null }));

    }

    const onPanelChange = (key) => {
        //Dispatch the active Panel
        dispatch(setActivePanel({ data: key[0] }));
    };


    return (
        <Layout className="site-layout-background">

            <Sider width={360}
                className="site-layout-background"
                style={{
                    backgroundColor: "white",
                    padding: "10px",
                    boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)',
                    zIndex: 1,
                }}>

                <Collapse
                    className="custom-collapse"
                    defaultActiveKey={STRING.ACTIVE_PANEL_ROUTING}
                    accordion
                    expandIcon={({ isActive }) =>
                        <CaretRightOutlined className="color-blue-dark"
                            rotate={isActive ? 90 : 0}
                            height={24}
                            fill={'red'}
                        />
                    }

                    onChange={onPanelChange}

                >
                    <Panel style={{ fontSize: "18px", fontWeight: "700" }} header={<AccordionHeader label={STRING.TITLE_ROUTING} img={faRoute} />} key={STRING.ACTIVE_PANEL_ROUTING}>

                        <RoutingInfoPanel pane={STRING.ACTIVE_PANEL_ROUTING} mapRef={mapRef} />

                    </Panel>

                    <Panel style={{ fontSize: "18px", fontWeight: "700" }} header={<AccordionHeader label={STRING.TITLE_TRIP} img={faPlane} />} key={STRING.ACTIVE_PANEL_TRIPPING}>

                        <TripInfoPanel pane={STRING.ACTIVE_PANEL_TRIPPING} mapRef={mapRef} />

                    </Panel>


                </Collapse>

                <Footer style={{ backgroundColor: 'white', position: 'fixed', bottom: 1, width: '340px' }}>
                    <ButtonCommon style={{ marginBottom: '1px' }} name='Clear Layer' buttonClick={buttonClick} />
                </Footer>

            </Sider>

            {/* Body Layout */}
            <Layout style={{ zIndex: '0' }}>

                <Map ref={mapRef} />

                <PopUpInfoBox />

            </Layout>

        </Layout>
    );
};
