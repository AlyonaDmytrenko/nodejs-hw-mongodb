import bcrypt from "bcrypt";
import createHttpError from 'http-errors';
import {User} from "../models/user.js";

export async function registrUswer(payload) {

    const user = await User.findOne({email: payload.email});

    if (user !== null){
        throw new createHttpError.Conflict("Email is already in use");
    }


    payload.password = await bcrypt.hash(payload.password, 10);

    return User.create(payload);
}

export async function loginUser(email, password) {
    const user = await User.findOne({email});

    if (user === null){
        throw new createHttpError.Unauthorized("Email or password is incorect");
    }
}  