import { type Request, type Response } from "express";
import { Router } from "express";
import { client } from "../../database.js";
import { ApiResponse } from "../../standards/apiResponce.js";

/*

- `POST /courses`
    - Only INSTRUCTOR can create courses
- `GET /courses`
    - Public endpoint
- `GET /courses/:id`
    - Get course with all lessons
- `PATCH /courses/:id`
    - Only course instructor
- `DELETE /courses/:id`
    - Only course instructor


*/

async function createCourse(req: Request, res: Response) {
	try {
		const { courseTitle, courseDesc, price, instructorId } = req?.body;

		const data = await client.course.create({
			data: {
				title: courseTitle,
				description: courseDesc,
				price,
				instructorId,
			},
		});

		res.status(201).json(
			new ApiResponse(201, "Course Created", {
				courseId: data.courseId,
			}),
		);
		return;
	} catch (error) {
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}

async function getCourses(req: Request, res: Response) {
	try {
	

		const data = await client.course.findMany()

		if (!data) {
			res.status(201).json(new ApiResponse(201, "No course with that id"));
            return; 
		}

		res.status(201).json(new ApiResponse(201, "Course Found", data));
		return;


	} catch (error) {
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}
async function getCourseInformation(req: Request, res: Response) {
	try {
		
        const courseId  = req?.params.courseId;

        if(!courseId) { 
            res.status(400).json(new ApiResponse(401, "courseId is required"));
            return;
        }

		const data = await client.course.findFirst({
			where: {
				courseId: courseId as string,
			},
		});

		if (!data) {
			res.status(201).json(new ApiResponse(404, "No course with that id"));
            return; 
		}

		res.status(201).json(new ApiResponse(201, "Course Found", data));
		return;




	} catch (error) {
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}
async function updateCourseInformation(req: Request, res: Response) {
	try {
		const courseId  = req?.params.courseId;

        if(!courseId) { 
            res.status(400).json(new ApiResponse(401, "courseId is required"));
            return;
        }



	} catch (error) {
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}
async function removeCourse(req: Request, res: Response) {
	try {
		const courseId  = req?.params.courseId;

        if(!courseId) { 
            res.status(400).json(new ApiResponse(401, "courseId is required"));
            return;
        }


        const data = await client.course.delete( { 
            where : { 
                courseId: courseId as string
            }
        })

        res.status(200).json(new ApiResponse(200, "courseId is deleted", data));
        return;

	} catch (error) {
		res.status(500).json(
			new ApiResponse(500, "Some Internal Server Error Occured", error),
		);
		return;
	}
}
