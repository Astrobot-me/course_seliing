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

async function createCourse(req:  Request, res : Response ) {

    try {

        const {} = req?.body; 

        
        
    } catch (error) {
        res.status(500)
        .json(new ApiResponse(
            500, 
            "Some Internal Server Error Occured", 
            error
        ))
        return; 
    }
    
}