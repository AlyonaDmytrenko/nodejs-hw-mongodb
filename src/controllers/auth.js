import { registrUswer } from "../services/auth.js";

export async function registerController(req, res) {

    const user = await registrUswer(req.body);

    res.json({ status: 201, message: "User register succsessfully", data: user });
}
