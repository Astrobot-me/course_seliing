import { Router, type Request, type Response } from "express";
import { client } from "../../database.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../../standards/apiResponce.js";
import { email } from "zod";

const router = Router();

export async function getUser(req: Request, res: Response) {
  try {
    const id = req.user?.id;

    if (!id) {
      res.status(401).json({
        message: "Missing or invalid ID",
      });
      return;
    }

    const user = await client.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error Occured ",
      error: error,
    });
    return;
  }
}


export async function addUser(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json(new ApiResponse(400, "Missing data", null));
    }

    // console.log(process.env.DATABASE_URL);
    // existing user

    const existingUser = await client.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      res.status(400).json(new ApiResponse(400, "User already exists", null));
      return;
    }

    const user = await client.user.create({
      data: {
        email: data.email,
        name: data.name,
        // password: data.password,
      },
    });

    res.status(200).json(new ApiResponse(200, "User created", user));
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error Occured ",
      error: error,
    });
    return;
  }
}




router.route("/").get(getUser).post(addUser);

export default router;
