import { useState } from "react";
import { useTranslation } from "react-i18next";
import VisitorsList from "../components/VisitorsList/VisitorsList";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { withAuth } from "../utils/withAuth";

type User = {
	id: string;
	name: string;
	surname: string;
	country: string;
	birthdate: string;
};

const RevisitedPage = () => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const { t } = useTranslation();

	const handlePick = (user: User) => {
		setSelectedUser(user);
		console.log("Picked user", user);
	};

	const handleLogout = () => {
		localStorage.removeItem("authKey");
		window.location.href = "/login";
	};

	return (
		<div className="revisited-container">
			<header className="revisited-header">
				<h1>{t("revisited")}</h1>
				<div className="header-actions">
					<LanguageSwitcher />
					<button onClick={handleLogout} className="logout-button">
						{t("auth.logout")}
					</button>
				</div>
			</header>

			{selectedUser && (
				<div className="selected-user-info">
					<h3>{t("userDetails.selectedUser")}</h3>
					<p>
						<strong>{t("labels.name")}:</strong> {selectedUser.name}{" "}
						{selectedUser.surname}
					</p>
					<p>
						<strong>{t("labels.country")}:</strong> {selectedUser.country}
					</p>
					<p>
						<strong>{t("labels.birthday")}:</strong> {selectedUser.birthdate}
					</p>
					<button
						onClick={() => setSelectedUser(null)}
						className="clear-selection"
					>
						{t("userDetails.clearSelection")}
					</button>
				</div>
			)}

			<VisitorsList onPick={handlePick} />
		</div>
	);
};

export default withAuth(RevisitedPage);
