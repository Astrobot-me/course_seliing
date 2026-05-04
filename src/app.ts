import app from "./index.js";
import express from "express";
import UserRouter from "./modules/user/index.js";
import AuthRouter from "./modules/auth/index.js"
import CourseRouter, { getCourses } from "./modules/courses/index.js"
import { client } from "./database.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";



app.use("/api/user", authMiddleware,UserRouter);
app.use("/api/auth",authMiddleware, AuthRouter);
app.use("/api/course", authMiddleware, CourseRouter); 
app.get("/api/course", getCourses); 



app.listen(6000, async () => {
  await client.$connect();
  console.log("Server is running on port 6000");
});
