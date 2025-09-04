import { Schema, model } from "mongoose";

const UserSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	birthdate: { type: String, required: true },
	country: { type: String, required: true },
});

export type UserDoc = {
	_id: string;
	name: string;
	surname: string;
	birthdate: string;
	country: string;
};

export const User = model<UserDoc>("User", UserSchema);

type UserInput = {
	name: string;
	surname: string;
	birthdate: string;
	country: string;
};

export type CreateUserArgs = {
	input: UserInput;
};
