import { AudioOutlined } from '@ant-design/icons';
import {React, useEffect} from 'react';
import { Input, Space } from 'antd';
import * as API_PARAMS from '../../middleware/query';
import { useDispatch, useSelector } from "react-redux";
import { 
  getAgentPoints,getDistHouseLoc 
} from "../../redux/slices/mapSlice";






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

  const getAgentPointsData = useSelector((state) => state.mapreducer.agentPoints);
  const getDistributorName = useSelector((state) => state.select.tripTest.distributor);



  //On Trip Test Search
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

  //Fetch the distributor house location
  useEffect(() => {

    if (getDistributorName) {

      //Dispatch Dist House location Data
    dispatch(getDistHouseLoc({
      url: gqlUrl,
      query: API_PARAMS.GET_DIST_HOUSE_LOCATION,
      variables: {
        "distributor": getDistributorName,
      }
    }))
      
    }
    
  }, [getDistributorName])
  



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

