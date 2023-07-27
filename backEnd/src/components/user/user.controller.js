const Joi = require("joi");
const { clientError, serverError } = require("../../utils/response");
const response = require("../../utils/response");
const CryptoOperation = require("../../utils/CryptoOperation");
const userModel = require('./model/user.model');

class User {
    async signup(req, res) {
        try {
            let email, password, isActive = 1;

            email = req.body.email;
            password = req.body.password;

            let userData = await userModel.find({
                email: email,
                isActive: 1,
            });

            if (userData.length === 1) {
                return response.duplicatedata(req, res, "user already exit");
            } else if (userData.length == 0) {
                password = await CryptoOperation.encrypt(password);
                let createUserData = await userModel.create({
                    email: email,
                    password: password,
                    isActive: 1,
                });
                return response.reply(req, res, "user account created");
            } else {
                return response.duplicatedata(req, res, "duplicate entry available");
            }
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }
}
module.exports = User;