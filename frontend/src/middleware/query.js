export const GRAPHQL_API_ENDPOINT = `${process.env.REACT_APP_GRAPHQL_API_ENDPOINT}/v1/graphql`

export const GET_AGENT_LOCATION = `
query GetAgentLocation($dso: String) {
	data: agent_position(
		where: { dso: { _eq: $dso }, latitude: { _is_null: false, _neq: "0" } }
		order_by: { agents: desc }
	) {
		agents
		agent_shop_name
		shop_address
		dso
		distributor
		ma_area
		ma_region
		thana
		district
		division
		image_path
		geometry: geom
	}

}
`;


export const GET_DIST_HOUSE_LOCATION = `
query GetBestRoute($distributor: String) {
    data: distributor_loc(
            where: { distributor: { _ilike: $distributor } }
        ) {
            distributor
            area
            region
            geom
        }
    }
`;

export const GET_BEST_ROUTE = `
query GetBestRoute($distributor: String, $dso: String) {
	agentLoc: agent_position(
		where: { dso: { _eq: $dso }, latitude: { _is_null: false, _neq: "0" } }
		order_by: { agents: desc }
	) {
		agents
		agent_shop_name
		shop_address
		dso
		distributor
		ma_area
		ma_region
		thana
		district
		division
		image_path
		geometry: geom
	}
	distributorLoc: distributor_loc(
		where: { distributor: { _ilike: $distributor } }
	) {
		distributor
		area
		region
		geom
	}
}
`;