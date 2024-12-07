const bcrypt = require('bcryptjs');
const userModel = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../../config/.env") });

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Compare password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Incorrect password",
                error: true,
                success: false,
            });
        }

        // Create token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Set cookie options
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
         
        };

        // Send response with cookie
        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data:token,
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
