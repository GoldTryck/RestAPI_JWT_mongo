import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token = await createAccesToken({ id: userSaved._id });
        res.cookie('token', token);
        /* 
        Omitir esta sintaxis creando un archivo en libs/jwt.js
        jwt.sign({
            id: userSaved._id
        }, 'secret123',
            {
                expiresIn: '1d',
            },
            (err, token) => {
                if (err) console.log(err);
                res.cookie('token', token);
                res.json({
                    message: "User created successfully"
                })
            }
        )*/
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


};
export const login = (req, res) => {
    res.json({
        message: 'Login'
    })
};