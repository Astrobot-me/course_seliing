import { Router } from "express";
import { ApiResponse } from "../../standards/apiResponce.js";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import { client } from "../../database.js";

async function signIn(req: Request, res: Response) {
	try {
		const { email, password } = req?.body;
		console.log(req.body)

		if (!email || !password) {
			res.status(400).json(new ApiResponse(500, "Fields are Required"));
			return;
		}

		const user = await client.user.findFirst({
			select: {
				id: true,
				email: true,
				role:true
			},
			where: {
				email: email,
			},
		});

		if (user) {
			const token = jwt.sign(
				{
					id: user.id,
					role: user.role,
					userEmail: user.email,
				},
				"mysecret",
				{
					expiresIn: "10m",
				},
			);

			res.status(200).json(
				new ApiResponse(200, "User logged in", {
					token,
				}),
			);
			return;
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}

const router = Router();
router.route("/sign-in").post(signIn);
export default router;
