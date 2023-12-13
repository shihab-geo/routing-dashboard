import axios from "axios";

let callGqlAPI = async (url, query, variables) => {

  return await privateAxios.post(url, {
    query: query,
    variables: variables,
  }, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + TokenService.getAccessToken(),
    },
  }
  );
};


export const fetchData = async (url, query, variables) =>
  callGqlAPI(url, query, variables);
  


export const routingData = async (url) => {
  return await axios.post(url)
};




