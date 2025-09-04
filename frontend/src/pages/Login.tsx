import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH_KEY } from "../utils/withAuth";

interface LocationState {
	from?: string;
}

const Login = () => {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const state = location.state as LocationState;
	const from = state?.from || "/revisited";

	useEffect(() => {
		const storedKey = localStorage.getItem("authKey");
		if (storedKey === AUTH_KEY) {
			navigate(from, { replace: true });
		}
	}, [navigate, from]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		await new Promise((resolve) => setTimeout(resolve, 500));

		if (input === AUTH_KEY) {
			localStorage.setItem("authKey", AUTH_KEY);
			navigate(from, { replace: true });
		} else {
			setError("Invalid authentication key");
			setInput("");
		}

		setIsLoading(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		if (error) setError("");
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2>Protected Access</h2>
				<p className="login-description">
					Enter your authentication key to access the revisited entries.
				</p>

				<form onSubmit={handleSubmit} className="login-form">
					<div className="input-group">
						<input
							type="password"
							value={input}
							onChange={handleInputChange}
							placeholder="Enter authentication key"
							className={`auth-input ${error ? "error" : ""}`}
							disabled={isLoading}
							autoFocus
						/>
						{error && <span className="error-message">{error}</span>}
					</div>

					<button
						type="submit"
						disabled={!input.trim() || isLoading}
						className="login-button"
					>
						{isLoading ? (
							<>
								<span className="spinner-small"></span>
								Authenticating...
							</>
						) : (
							"Access Dashboard"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
