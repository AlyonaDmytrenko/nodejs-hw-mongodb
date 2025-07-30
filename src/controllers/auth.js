import { registrUswer, loginUser } from "../services/auth.js";

export async function registerController(req, res) {

    const user = await registrUswer(req.body);

    res.json({ status: 201, message: "User register succsessfully", data: user });
}

export async function loginController(req, res) {

    const result = await loginUser(req.body.email, req.body.password);

    console.log(result);
    
    res.send("login");
}