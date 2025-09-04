import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: "en", name: t("languages.en"), flag: "🇬🇧" },
		{ code: "pt", name: t("languages.pt"), flag: "🇵🇹" },
	];

	const currentLanguage =
		languages.find((lang) => lang.code === i18n.language) || languages[0];

	const changeLanguage = (languageCode: string) => {
		i18n.changeLanguage(languageCode);
		localStorage.setItem("language", languageCode);
		setIsOpen(false);
	};

	return (
		<div className="language-switcher">
			<button
				className="language-trigger"
				onClick={() => setIsOpen(!isOpen)}
				aria-label={t("lang")}
			>
				<span className="flag">{currentLanguage.flag}</span>
				<span className="language-code">
					{currentLanguage.code.toUpperCase()}
				</span>
				<span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
			</button>

			{isOpen && (
				<div className="language-dropdown">
					{languages.map((language) => (
						<button
							key={language.code}
							className={`language-option ${
								i18n.language === language.code ? "active" : ""
							}`}
							onClick={() => changeLanguage(language.code)}
						>
							<span className="flag">{language.flag}</span>
							<span className="language-name">{language.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
