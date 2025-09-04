import { useState } from "react";
import { useTranslation } from "react-i18next";
import VisitorForm from "../components/Form/VisitorForm";
import VisitorsList from "../components/VisitorsList/VisitorsList";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { buildGreeting } from "../utils/greetings";

const Home = () => {
	const [greeting, setGreeting] = useState("");
	const { t } = useTranslation();

	return (
		<>
			<div className="home-header">
				<h1>{t("home")}</h1>
				<LanguageSwitcher />
			</div>
			<div className="home-page">
				<div className="form-container">
					<h2>{t("form.addNewVisitor")}</h2>
					<VisitorForm setGreeting={setGreeting} />
					{greeting && (
						<div className="success-message">
							<p>{greeting}</p>
						</div>
					)}
				</div>
				<div className="list-container">
					<h2>{t("labels.pickVisitor")}</h2>
					<VisitorsList
						onPick={(v) => {
							const message = buildGreeting(v.name, v.country, v.birthdate, t);
							setGreeting(message);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
