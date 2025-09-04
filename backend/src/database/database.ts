import mongoose from "mongoose";
import { ENV } from "../env";

export const connectDB = async () => {
	console.log(ENV.MONGO_URI);
	await mongoose.connect(ENV.MONGO_URI!);
	console.log("Mongo connected");
};
