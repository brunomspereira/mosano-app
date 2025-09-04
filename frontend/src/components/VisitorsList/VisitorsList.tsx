import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLoading } from "../Loader/LoadingProvider";
import { useEffect } from "react";

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

type User = {
	id: string;
	name: string;
	surname: string;
	country: string;
	birthdate: string;
};

type GetUsersData = { getUsers: User[] };
type Props = { onPick: (v: User) => void };

export default function VisitorsList({ onPick }: Props) {
	const { t } = useTranslation();
	const { start, finish } = useLoading();
	const { data, loading } = useQuery<GetUsersData>(GET_USERS);

	useEffect(() => {
		if (loading) start();
		else finish();
		return () => finish();
	}, [loading]);

	const users = data?.getUsers ?? [];

	return (
		<table className="table-users">
			<thead>
				<tr>
					<th>{t("table.name")}</th>
					<th>{t("table.country")}</th>
					<th>{t("table.birthday")}</th>
				</tr>
			</thead>
			<tbody>
				{users.length > 0 ? (
					users.map((v) => (
						<motion.tr
							key={v.id}
							whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
							style={{ cursor: "pointer" }}
							onClick={() => onPick(v)}
						>
							<td>
								{v.name} {v.surname}
							</td>
							<td>{v.country}</td>
							<td>{v.birthdate}</td>
						</motion.tr>
					))
				) : (
					<tr>
						<td colSpan={3} style={{ textAlign: "center", opacity: 0.5 }}>
							{t("userDetails.noUsersFound")}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
