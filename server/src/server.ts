import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import DBConnection from "./config/mongo.db";
import * as cors from "cors";

dotenv.config()
DBConnection();

const app = express()
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

import auth from "./routes/auth";
app.use("/", auth);
import prompt from "./routes/prompt";
app.use("/", prompt);

import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

app.use(notFound);
app.use(errorHandler);

export default app;