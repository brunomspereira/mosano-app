import express from "express";
import { ENV } from "./env";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { connectDB } from "./database/database";

interface AuthContext {
	token?: string;
}

async function start() {
	await connectDB();
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer<AuthContext>({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	app.use(
		"/",
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const token = req.headers["authorization"] || "";
				return { token };
			},
		})
	);

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: ENV.PORT }, resolve)
	);

	console.log(`🚀 Server ready at http://localhost:${ENV.PORT}/`);
}

start();
