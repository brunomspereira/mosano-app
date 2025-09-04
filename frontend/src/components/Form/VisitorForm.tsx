import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import SelectCountry from "./SelectCountry";
import { buildGreeting } from "../../utils/greetings";

const CREATE_USER = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			name
			surname
			country
			birthdate
		}
	}
`;

const GET_USERS = gql`
	query GetUsers {
		getUsers {
			id
			name
			surname
			birthdate
			country
		}
	}
`;

type FormValues = {
	name: string;
	surname: string;
	country: string;
	birthdate: string;
};

type Props = {
	setGreeting: (msg: string) => void;
};

export default function VisitorForm({ setGreeting }: Props) {
	const { t } = useTranslation();

	const schema = yup.object({
		name: yup.string().required(t("form.validation.required")),
		surname: yup.string().required(t("form.validation.required")),
		country: yup.string().required(t("form.validation.required")),
		birthdate: yup
			.string()
			.required(t("form.validation.required"))
			.matches(/\d{2}\/\d{2}\/\d{4}/, t("form.validation.dateFormat")),
	});

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const [createUser, { loading }] = useMutation(CREATE_USER, {
		refetchQueries: [GET_USERS],
	});

	const onSubmit = async (values: FormValues) => {
		try {
			await createUser({ variables: { input: values } });
			const message = buildGreeting(
				values.name,
				values.country,
				values.birthdate,
				t
			);
			setGreeting(message);
			reset();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-row">
				<label>{t("labels.name")}:</label>
				<input
					{...register("name")}
					placeholder={t("labels.name")}
					className={errors.name ? "error" : ""}
				/>
				{errors.name && (
					<span className="field-error">{errors.name.message}</span>
				)}
			</div>

			<div className="form-row">
				<label>{t("labels.surname")}:</label>
				<input
					{...register("surname")}
					placeholder={t("labels.surname")}
					className={errors.surname ? "error" : ""}
				/>
				{errors.surname && (
					<span className="field-error">{errors.surname.message}</span>
				)}
			</div>

			<div className="form-row">
				<label>{t("labels.country")}:</label>
				<Controller
					name="country"
					control={control}
					render={({ field }) => (
						<SelectCountry
							value={field.value || ""}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.country && (
					<span className="field-error">{errors.country.message}</span>
				)}
			</div>

			<div className="form-row">
				<label>{t("labels.birthday")}:</label>
				<input
					{...register("birthdate")}
					placeholder={t("form.birthdatePlaceholder")}
					maxLength={10}
					className={errors.birthdate ? "error" : ""}
					onChange={(e) => {
						let value = e.target.value.replace(/\D/g, "");
						if (value.length >= 5) {
							value = value.replace(/(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
						} else if (value.length >= 3) {
							value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
						}
						e.target.value = value;
					}}
				/>
				{errors.birthdate && (
					<span className="field-error">{errors.birthdate.message}</span>
				)}
			</div>

			<div className="form-actions">
				<motion.button
					whileTap={{ scale: 0.98 }}
					type="submit"
					disabled={loading}
				>
					{loading ? t("form.saving") : t("labels.save")}
				</motion.button>
			</div>
		</form>
	);
}
