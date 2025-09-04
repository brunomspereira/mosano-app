import dotenv from "dotenv";

dotenv.config();

export const ENV = {
	MONGO_URI: process.env.MONGO_URI,
	AUTH_TOKEN: process.env.AUTH_TOKEN,
	PORT: process.env.PORT,
};
