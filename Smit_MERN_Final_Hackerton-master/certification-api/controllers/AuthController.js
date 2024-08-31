import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/auth.js";


class AuthController {


    static async Register(req, res) {
        try {
            console.log(req.body); // Log request body for debugging
            const { email, password, Name } = req.body;

            // Check if email already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send('Email already exists. Please enter a unique email.');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new userModel({
                email,
                password: hashedPassword,
                Name,
            });

            // Save user to database
            await newUser.save();
            res.status(201).send('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error.message); // Log MongoDB error message
            res.status(500).send('Error registering user');
        }
    }


    static async Login(req, res) {
        try {
            const user = await userModel.findOne({ email: req.body.email });
            if (!user) return res.status(404).send('User not found');
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) return res.status(401).send('Invalid password');

            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken, ...user._doc });
        } catch (error) {
            res.send({ message: "Something went wrong" });
        }
    }

}

export default AuthController