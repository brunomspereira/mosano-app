import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import PageLoader from "./PageLoader";
import App from "../../App";
const PING = gql`
	query Ping {
		__typename
	}
`;

export default function AppLoader() {
	const { loading } = useQuery(PING);

	if (loading) return <PageLoader />;
	return <App />;
}
