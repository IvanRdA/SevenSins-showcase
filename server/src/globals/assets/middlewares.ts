import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InvalidToken, NullTokenError } from '../classes/Errors';
import { handleError } from './libs';
import { RequestWithUser } from '../../types';

// A verify JSON Web Token method for future security authorization and authentication processes on the queries.
export function verifyToken(req: RequestWithUser, res: Response, next: NextFunction): void {
    try{
        const token = req.header('Authorization')
        const secret: string = process.env.SECRET_TOKEN as string
    
        if(!token){
            throw new NullTokenError('Unauthorized.')
        }

        try{
            const decoded = jwt.verify(token, secret)
            req.user = decoded
            next()
        }catch(jwtError: any) {
            throw new InvalidToken('Unauthorized. Invalid token.')
        }
    }catch(error: any){
        res.status(401).json(handleError(error))
    } 
}