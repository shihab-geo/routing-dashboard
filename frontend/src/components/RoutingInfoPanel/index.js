import { React, useState, useEffect } from 'react';
import { Input, Form, Col, Radio, Divider, Row, Space } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import * as STRING_VARS from "../../strings";
import {
  setEngine,
  setProfile,
} from "../../redux/slices/selectSlice";




export const RoutingInfoPanel = (props) => {

  const mapRef = props.mapRef;
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const [engineState, setEngineState] = useState(STRING_VARS.ENGINE_OSRM);
  const [profileState, setProfileState] = useState(STRING_VARS.PROFILE_CAR);

  const routeFromHere = useSelector((state) => state.select.routingInfo.routeFrom);
  const routeToHere = useSelector((state) => state.select.routingInfo.routeTo);


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
      <Divider>{STRING_VARS.TITLE_ENGINE}</Divider>

      <>
        <Radio.Group onChange={onEngineChange} value={engineState}>
          <Row gutter={12}>
            <Col span={12}>
              <Radio value={STRING_VARS.ENGINE_OSRM}>{STRING_VARS.ENGINE_OSRM}</Radio>
            </Col>

            <Col span={12}>
              <Radio value={STRING_VARS.ENGINE_VALHALLA}>{STRING_VARS.ENGINE_VALHALLA}</Radio>
            </Col>

            <Col span={12}>
              <Radio value={STRING_VARS.ENGINE_GRAPHHOPPER}>{STRING_VARS.ENGINE_GRAPHHOPPER}</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </>

      {/* Profile */}
      <Divider>{STRING_VARS.TITLE_PROFILE}</Divider>

      <>
        <Radio.Group onChange={onProfileChange} value={profileState}>
          <Row gutter={12}>
            <Col span={12}>
              <Radio value={STRING_VARS.PROFILE_CAR}>{STRING_VARS.PROFILE_CAR}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING_VARS.PROFILE_MOTORBIKE}>{STRING_VARS.PROFILE_MOTORBIKE}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING_VARS.PROFILE_CYCLE}>{STRING_VARS.PROFILE_CYCLE}</Radio>
            </Col>
            <Col span={12}>
              <Radio value={STRING_VARS.PROFILE_FOOT}>{STRING_VARS.PROFILE_FOOT}</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </>

    </>

  )
}
