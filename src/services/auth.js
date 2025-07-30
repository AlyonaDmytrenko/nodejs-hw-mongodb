import createHttpError from 'http-errors';
import {User} from "../models/user.js";

export async function registrUswer(payload) {

    const user = await User.findOne({email: payload.email});

    if (user !== null){
        throw new createHttpError.Conflict("Email is already in use");
    }
    return User.create(payload);
}