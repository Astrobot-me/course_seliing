import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import { ApiResponse } from "../standards/apiResponce.js";

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		// Get the Authorization header (supports req.header('Authorization') and req.headers.authorization)
		const authHeader = req.header("Authorization");
		if (!authHeader)
			return res
				.status(401)
				.json({ message: "Authorization header missing" });

		// Expect header in format: "Bearer <token>"
		const parts = authHeader.split(" ");
		if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
			return res
				.status(401)
				.json({ message: "Invalid authorization header format" });
		}

		const token = parts[1];
		console.log("Bearer token:", token);

		// attach token for downstream middlewares/controllers
		const decoded = jwt.verify(token as string, "mysecret") as unknown as {
			id: string;
			role: string;
		};

		(req as any).token = token;
		(req as any).role = decoded.role;
		(req as any).userId = decoded.id;

        console.log(req)

		next();
	} catch (error) {
		res.status(400).json(new ApiResponse(400, "Invalid Access Token"));
		return;
	}
}
