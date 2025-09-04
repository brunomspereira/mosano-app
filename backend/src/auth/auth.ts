import { GraphQLError } from "graphql";
import { ENV } from "../env";

// basic token authentication
export function requireAuth(context: { token?: string }) {
	if (context.token !== ENV.AUTH_TOKEN) {
		throw new GraphQLError("Unauthorized");
	}
}
