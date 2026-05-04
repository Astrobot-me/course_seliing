import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import { ApiResponse } from "../standards/apiResponce.js";

export async function roleChecker(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const role = (req as any).role;
		if (role != "INSTRUCTOR") {
			throw Error("Access Denied: Higher Privillage Role Required ");
		}

		next();
	} catch (error) {
		res.status(400).json(new ApiResponse(400, "Invalid Access Token"));
		return;
	}
}
