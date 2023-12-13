import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import * as API_PARAMS from '../../middleware/query';
import { useDispatch, useSelector } from "react-redux";
import { getAgentPoints } from "../../redux/slices/mapSlice";






const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);





export const TripTestPanel = (props) => {

  const mapRef = props.mapRef;
  const dispatch = useDispatch();
  const gqlUrl = API_PARAMS.GRAPHQL_API_ENDPOINT;



  const onSearch = (dso) => {
    console.log(dso);
    //01833318404

    //Dispatch Agent Points of the input DSO
    dispatch(getAgentPoints({
      url: gqlUrl,
      query: API_PARAMS.GET_AGENT_LOCATION,
      variables: {
        "dso": dso,
      }
    }))

  }



  return (
    <Space direction="vertical">
      <Search
        placeholder="Input DSO Number"
        onSearch={onSearch}
        style={{
          maxWidth: 'auto',
        }}
      />
    </Space>
  )
}

