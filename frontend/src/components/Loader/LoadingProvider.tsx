import { createContext, useContext, useState, type ReactNode } from "react";
import PageLoader from "./PageLoader";

type LoadingContextType = {
	start: () => void;
	finish: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
	const [count, setCount] = useState(0);

	const start = () => setCount((c) => c + 1);
	const finish = () => setCount((c) => Math.max(0, c - 1));

	return (
		<LoadingContext.Provider value={{ start, finish }}>
			{children}
			{count > 0 && (
				<div className="page-loader-overlay">
					<PageLoader />
				</div>
			)}
		</LoadingContext.Provider>
	);
}

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context)
		throw new Error("useLoading must be used inside a LoadingProvider");
	return context;
};
