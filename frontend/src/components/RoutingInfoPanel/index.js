import { React, useState, useEffect } from 'react';
import { Input, Form, Col, Radio, Divider, Row } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import * as STRING from "../../strings";
import {
  setEngine,
  setProfile,
} from "../../redux/slices/selectSlice";




export const RoutingInfoPanel = (props) => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const [engineState, setEngineState] = useState(STRING.ENGINE_OSRM);
  const [profileState, setProfileState] = useState(STRING.PROFILE_CAR);


  const routeFromHere = useSelector((state) => state.select.routeInfo.routeFrom);
  const routeToHere = useSelector((state) => state.select.routeInfo.routeTo);


  //OnChange Engine Radio Buttons
  const onEngineChange = (e) => {

    //Update the Engine State
    setEngineState(e.target.value);

    //Dispatch the Engine state
    dispatch(setEngine({ data: e.target.value }));

  };

  //OnChange Profile Radio Buttons
  const onProfileChange = (e) => {

    //Update the Engine State
    setProfileState(e.target.value);

    //Dispatch the Profile state
    dispatch(setProfile({ data: e.target.value }));

  };


  //Update the form input values
  useEffect(() => {
    form.setFieldsValue({ routeFromHere: routeFromHere, routeToHere: routeToHere });
  }, [routeFromHere, routeToHere]);


  //? Plot the Routing Map
  // useEffect(() => {

  //   if (getActivePanel === STRING.ACTIVE_PANEL_ROUTING) {
  //           mapRef.current.distanceMarker();

  //   }

  // }, [getActivePanel])



  return (

    <>
      {/* Show Route Distance */}
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: 'auto',
        }}
      >
        <Form.Item
          label="From Here"
          name="routeFromHere"
          labelCol={{ span: 24 }}
        >
          <Input initialvalues={routeFromHere} />
        </Form.Item>

        <Form.Item
          label="To Here"
          name="routeToHere"
          labelCol={{ span: 24 }}
        >
          <Input initialvalues={routeToHere} />
        </Form.Item>

      </Form>

      {/* Engine */}
      <Divider>{STRING.TITLE_ENGINE}</Divider>

      <>
        <Radio.Group onChange={onEngineChange} value={engineState}>
          <Row gutter={12}>
            <Col span={12}>
              <Radio value={STRING.ENGINE_OSRM}>{STRING.ENGINE_OSRM}</Radio>
            </Col>

            <Col span={12}>
              <Radio value={STRING.ENGINE_VALHALLA}>{STRING.ENGINE_VALHALLA}</Radio>
            </Col>

            <Col span={12}>
              <Radio value={STRING.ENGINE_GRAPHHOPPER}>{STRING.ENGINE_GRAPHHOPPER}</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </>

      {/* Profile */}
      <Divider>{STRING.TITLE_PROFILE}</Divider>

      <>
        <Radio.Group onChange={onProfileChange} value={profileState}>
          <Row gutter={12}>
            <Col span={12}>
              <Radio value={STRING.PROFILE_CAR}>{STRING.PROFILE_CAR}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING.PROFILE_MOTORBIKE}>{STRING.PROFILE_MOTORBIKE}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING.PROFILE_CYCLE}>{STRING.PROFILE_CYCLE}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING.PROFILE_FOOT}>{STRING.PROFILE_FOOT}</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </>

    </>

  )
}
