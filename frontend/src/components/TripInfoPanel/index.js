import { React, useEffect, useState } from 'react';
import { Alert, Input, Space } from 'antd';
import * as API_PARAMS from '../../middleware/query';
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentPoints, getDistHouseLoc
} from "../../redux/slices/mapSlice";
import {
  setDso, setTrippingDistance,
  setTripingDuration,
} from "../../redux/slices/selectSlice";
import { fetchData, routingData } from "../../services/api.service";
import { pointGeoJsonFromGeom } from "../Map/geoJsonConverter";
import * as polylineDecode from "@mapbox/polyline";
import * as COMMON_FUNC from "../../common";




export const TripInfoPanel = (props) => {

  const mapRef = props.mapRef;
  const dispatch = useDispatch();
  const gqlUrl = API_PARAMS.GRAPHQL_API_ENDPOINT;

  const { Search } = Input;

  const [showBestRoute, setShowBestRoute] = useState(false);


  const getDistributorName = useSelector((state) => state.select.tripInfo.distributor);
  const getDso = useSelector((state) => state.select.tripInfo.dso);



  //On Trip Test Search
  const onSearch = (dso) => {

    //Dispatch DSO
    dispatch(setDso({ data: dso }));

    //Update show best route status
    setShowBestRoute(true);

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

        try {

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

            const responseFromTripping = await routingData(api);
            // console.log(responseFromRouting.data.trips[0].geometry);
            // console.log(responseFromTripping);
            const distance = responseFromTripping.data.trips[0].distance / 1000;
            const duration = responseFromTripping.data.trips[0].duration;

            //Dispatch the distance & duration
            dispatch(setTrippingDistance({ data: distance.toFixed(2) }));
            dispatch(setTripingDuration({ data: COMMON_FUNC.formatTime(duration) }));

            dsoBestRoute = polylineDecode.toGeoJSON(responseFromTripping.data.trips[0].geometry);


            if (response.status === 200) {
              if (mapRef.current === undefined) return; // Map ref is not set yet

              try {

                mapRef.current.addBestRouting(dsoBestRoute, agentPoints, distributorLoc[0].geom);

              } catch (error) {

              }

            } else {
              console.log(response.status);
            }

          }

          //Update show best route status
          setShowBestRoute(false);

        } catch (error) {

        }

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
          width: '300px',
        }}
      />
    </Space>
  )
}

