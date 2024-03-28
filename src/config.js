import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const TOKEN_SECRET = 'some_secret_key';