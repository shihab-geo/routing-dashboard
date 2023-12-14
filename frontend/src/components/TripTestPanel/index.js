import { AudioOutlined } from '@ant-design/icons';
import { React, useEffect, useState } from 'react';
import { Alert, Input, Space } from 'antd';
import * as API_PARAMS from '../../middleware/query';
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentPoints, getDistHouseLoc
} from "../../redux/slices/mapSlice";
import {
  setDso,
} from "../../redux/slices/selectSlice";
import { fetchData, routingData } from "../../services/api.service";
import { pointGeoJsonFromGeom } from "../Map/geoJsonConverter";
import * as polylineDecode from "@mapbox/polyline";







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
  const [showBestRoute, setShowBestRoute] = useState(false);

  const getAgentPointsData = useSelector((state) => state.mapreducer.agentPoints);
  const getDistributorName = useSelector((state) => state.select.tripTest.distributor);
  const getDso = useSelector((state) => state.select.tripTest.dso);



  //On Trip Test Search
  const onSearch = (dso) => {

    //Dispatch DSO
    dispatch(setDso({ data: dso }));

    //Update show best route status
    setShowBestRoute(true);

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

    if (getDistributorName && getDso && showBestRoute) {

      const fetchBestRoute = async () => {

        const response = await fetchData(gqlUrl, API_PARAMS.GET_BEST_ROUTE, {
          dso: getDso,
          distributor: getDistributorName,
        });

        const agentPoints = pointGeoJsonFromGeom(response.data.data.agentLoc);
        let distributorLoc = response.data.data.distributorLoc;
        var dsoBestRoute = null;

        if (distributorLoc.length === 0) {
          let message = 'Distributor House Location Not Found!!'
          let description = 'Unable to show the best route since the distributor house location is not found.'
          // openNotification('error', 'top', message, description)
          Alert('Error: ' + message);

        } else {

          //OSRM Optimized Routing
          let locations = [];
          locations.push(distributorLoc[0].geom.coordinates);
          for (let coord of agentPoints.features) {
            let lat = coord.geometry.coordinates[1];
            let lon = coord.geometry.coordinates[0];
            let coordinateArray = lon + "," + lat;
            locations.push(coordinateArray);
          }
          locations.push(distributorLoc[0].geom.coordinates);

          const url = API_PARAMS.OSRM_API_ENDPOINT;
          const api = url + "trip/v1/driving/" + locations.join(";") + "?geometries=polyline&overview=full&steps=true&annotations=false";
          const responseFromRouting = await routingData(api);
          // console.log(responseFromRouting.data.trips[0].geometry);
          dsoBestRoute = polylineDecode.toGeoJSON(responseFromRouting.data.trips[0].geometry);


          if (response.status === 200) {
            if (mapRef.current === undefined) return; // Map ref is not set yet
            mapRef.current.addBestRouting(dsoBestRoute, agentPoints, distributorLoc[0].geom);
          } else {
            console.log(response.status);
          }

        }

        //Update show best route status
        setShowBestRoute(false);

      }

      fetchBestRoute();

    }



  }, [getDistributorName, getDso, showBestRoute])






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

