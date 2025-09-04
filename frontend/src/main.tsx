import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import AppLoader from "./components/Loader/AppLoader";
import { LoadingProvider } from "./components/Loader/LoadingProvider";

const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_API_URI }),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<LoadingProvider>
				<AppLoader />
			</LoadingProvider>
		</ApolloProvider>
	</StrictMode>
);
