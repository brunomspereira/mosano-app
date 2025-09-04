import { model, Schema } from "mongoose";

const CountrySchema = new Schema({
	name: { type: String, required: true },
	code: { type: String, required: true },
});

export type CountryDoc = {
	_id: string;
	name: string;
	code: string;
};

export const Country = model<CountryDoc>("Country", CountrySchema);

type CountryInput = {
	name: string;
	code: string;
};

export type CreateCountryArgs = {
	input: CountryInput;
};

export type UpdateCountryArgs = {
	id: string;
	input: Partial<CountryInput>;
};

export type DeleteCountryArgs = {
	id: string;
};
