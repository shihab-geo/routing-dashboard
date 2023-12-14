import { AudioOutlined } from '@ant-design/icons';
import {React, useEffect,useState} from 'react';
import { Input, Space } from 'antd';
import * as API_PARAMS from '../../middleware/query';
import { useDispatch, useSelector } from "react-redux";
import { 
  getAgentPoints,getDistHouseLoc 
} from "../../redux/slices/mapSlice";
import { 
  setDso, 
} from "../../redux/slices/selectSlice";
import { fetchData, routingData } from "../../services/api.service";
import {pointGeoJsonFromGeom} from "../Map/geoJsonConverter";






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

  const [dsoNumber, setDsoNumber] = useState();

  const getAgentPointsData = useSelector((state) => state.mapreducer.agentPoints);
  const getDistributorName = useSelector((state) => state.select.tripTest.distributor);
  const getDso = useSelector((state) => state.select.tripTest.dso);



  //On Trip Test Search
  const onSearch = (dso) => {

    //Dispatch DSO
    dispatch(setDso({data:dso}));

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


  //Fetch Best Route
  useEffect(() => {
    
    if (getDistributorName && getDso) {

      const fetchBestRoute = async () => {

        const response = await fetchData(gqlUrl, API_PARAMS.GET_BEST_ROUTE, {
          dso: getDso,
          distributor: getDistributorName,
      });

      const agentPoints = pointGeoJsonFromGeom(response.data.data.agentLoc);
            let distributorLoc = response.data.data.distributorLoc;
            var dsoBestRoute = null;

      }

      fetchBestRoute();
  
    }

  }, [getDistributorName,getDso])
  
  



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

