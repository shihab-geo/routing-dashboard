import axios from "axios";

const privateAxios = axios.create();


let callGqlAPI = async (url, query, variables) => {

  return await privateAxios.post(url, {
    query: query,
    variables: variables,
  }, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + TokenService.getAccessToken(),
      'x-hasura-admin-secret': 'myadminsecretkey',
    },
  }
  );
};


export const fetchData = async (url, query, variables) =>
  callGqlAPI(url, query, variables);



export const routingData = async (url) => {
  return await axios.post(url)
};




