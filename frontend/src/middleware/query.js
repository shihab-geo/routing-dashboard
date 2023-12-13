export const GET_DSO_BEST_ROUTE = `
query GetDSOBestRoute($distributor: String, $dso: String) {
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