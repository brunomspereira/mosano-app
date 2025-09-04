import "./i18n";
import { Suspense } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Revisited from "./pages/Revisited";
import Login from "./pages/Login";
import "./i18n";
import "./App.css";

function LoadingFallback() {
	return (
		<div className="page-loader">
			<div className="spinner"></div>
		</div>
	);
}

export default function App() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Router>
				<div className="app">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/revisited" element={<Revisited />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</div>
			</Router>
		</Suspense>
	);
}
