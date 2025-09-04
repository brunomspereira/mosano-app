import {
	Country,
	type CreateCountryArgs,
	type UpdateCountryArgs,
	type DeleteCountryArgs,
} from "../models/Country";
import { User, type CreateUserArgs } from "../models/User";
import { requireAuth } from "../auth/auth";
import type { Token } from "../models/Token";

export const resolvers = {
	Query: {
		getCountries: async () => {
			const countries = await Country.find().lean();
			return countries.map((c) => ({
				id: c._id.toString(),
				...c,
			}));
		},
		getUsers: async () => {
			const users = await User.find().lean();
			return users.map((u) => ({
				id: u._id.toString(),
				...u,
			}));
		},
	},
	Mutation: {
		createUser: async (_parent: unknown, { input }: CreateUserArgs) => {
			const newUser = await User.create(input);
			return {
				id: newUser._id.toString(),
				...input,
			};
		},

		// protected by auth token
		createCountry: async (
			_parent: unknown,
			{ input }: CreateCountryArgs,
			context: Token
		) => {
			requireAuth(context);
			const newCountry = await Country.create(input);
			return { id: newCountry._id.toString(), ...input };
		},
		updateCountry: async (
			_parent: unknown,
			{ id, input }: UpdateCountryArgs,
			context: Token
		) => {
			requireAuth(context);
			const updated = await Country.findByIdAndUpdate(id, input, { new: true });
			return updated && { id: updated._id.toString(), ...input };
		},
		deleteCountry: async (
			_parent: unknown,
			{ id }: DeleteCountryArgs,
			context: Token
		) => {
			requireAuth(context);
			const deleted = await Country.findByIdAndDelete(id);
			return deleted && { id: deleted._id.toString(), name: deleted.name };
		},
	},
};
