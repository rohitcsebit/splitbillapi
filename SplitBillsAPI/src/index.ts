import express, { Application, Request, Response } from "express";
import { connectToDb } from "./utils/ConnectToDB";
import router from "./routes";
import * as dotenv from "dotenv";
dotenv.config();

const dbUri = <string>process.env.dbUri;

const port = 3000;

const app: Application = express();

app.use(express.json());

connectToDb(dbUri);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
  console.log(
    `All the api routes are available in the routes http://localhost:${port}/api`
  );
});
