import { useEffect, useState, type ReactNode, type ComponentType } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AUTH_KEY = "password";

export function withAuth<T extends object>(Component: ComponentType<T>) {
	const AuthenticatedComponent = (props: T & { children?: ReactNode }) => {
		const navigate = useNavigate();
		const location = useLocation();
		const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

		useEffect(() => {
			const checkAuth = () => {
				const storedKey = localStorage.getItem("authKey");
				if (storedKey === AUTH_KEY) {
					setIsAuthorized(true);
				} else {
					setIsAuthorized(false);
					navigate("/login", {
						state: { from: location.pathname },
						replace: true,
					});
				}
			};

			checkAuth();
		}, [navigate, location]);

		if (isAuthorized === null) {
			return (
				<div className="auth-loading">
					<div className="spinner"></div>
					<p>Checking authorization...</p>
				</div>
			);
		}

		return isAuthorized ? <Component {...props} /> : null;
	};

	AuthenticatedComponent.displayName = `withAuth(${
		Component.displayName || Component.name
	})`;

	return AuthenticatedComponent;
}

export { AUTH_KEY };
