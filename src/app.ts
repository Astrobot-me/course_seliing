import app from "./index.js";
import express from "express";
import UserRouter from "./modules/user/index.js";
import { client } from "./database.js";



app.use("/api/user", UserRouter);

app.listen(6000, async () => {
  await client.$connect();
  console.log("Server is running on port 6000");
});
