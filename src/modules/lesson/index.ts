import { client } from "../../database.js";
import { ApiResponse } from "../../standards/apiResponce.js";
import { type Request, type Response } from "express";

/**
 * 
 * 
 * ### Lesson Endpoints

- `POST /lessons`
    - Only instructor of the course
- `GET /courses/:courseId/lessons`
    - Public
 */



export async function getLessons(req: Request, res :Response) {
    try {  
        
        const courseId = req.params.courseId; 

        if(!courseId) {
            
            res.status(500).json(new ApiResponse(500, "courseId is required"));  
            return;
        } 

        const lesson = await client.lesson.findFirst( { 
            where :{ 
                courseId: courseId as string 
            }
        })
        
        
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Some Error Occurred", error));
		return;   
    }
}

async function createLessonPlan(req: Request, res :Response) {
    try {  
        
        
        
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Some Error Occurred", error));
		return;   
    }   
}