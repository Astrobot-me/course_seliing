import jwt from 'jsonwebtoken'; 
import { type NextFunction, type Request, type Response } from 'express';

export async function roleChecker(req : Request, res: Response, next : NextFunction) {
    try {

        const token = req.role; 
        if(role != "INSTRUCTOR"){

            throw Error("Access Denied: Higher Privillage Role Required ")
        }

        next(); 
        
    } catch (error) {
        
        return
    }
}