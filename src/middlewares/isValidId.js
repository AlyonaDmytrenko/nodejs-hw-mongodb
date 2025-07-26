import { isValidObjectId } from 'mongoose';

export function validId(req, res, next) {
    if (isValidObjectId(req.params.id) !== true) {
        return res.status(400).json({ status: 'error', message: 'ID is not valid' });
    }
    console.log(req.params.id);

    next();
}

export function validateBody(req, res, next){
    console.log(req.body);
    
    next();
}