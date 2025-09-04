import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useLoading } from "../Loader/LoadingProvider";
import { useEffect } from "react";

const GET_COUNTRIES = gql`
	query GetCountries {
		getCountries {
			id
			name
			code
		}
	}
`;

type Country = {
	id: string;
	name: string;
	code: string;
};

type GetCountriesData = { getCountries: Country[] };

const SelectCountry = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) => {
	const { t } = useTranslation();
	const { start, finish } = useLoading();
	const { loading, error, data } = useQuery<GetCountriesData>(GET_COUNTRIES);

	useEffect(() => {
		if (loading) start();
		else finish();
		return () => finish();
	}, [loading]);

	if (error) return <p>{t("form.errorLoadingCountries")}</p>;

	const countries =
		data?.getCountries.slice().sort((a, b) => a.name.localeCompare(b.name)) ||
		[];

	return (
		<select
			name="country"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			<option value="">{t("form.selectCountry")}</option>
			{countries?.map((country: { id: string; name: string }) => (
				<option key={country.id} value={country.name}>
					{country.name}
				</option>
			))}
		</select>
	);
};

export default SelectCountry;
