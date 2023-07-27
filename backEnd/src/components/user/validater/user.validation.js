const Joi = require("joi");
const { clientError, serverError } = require("../../../utils/response");

class UserSignUp {
    async signUp(req, res, next) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password:Joi.string().required()
            });
            const { error } = await schema.validate(req.body);
            if (error) {
                return clientError(req, res, error.details[0].message);
            } 
            const payload = req.body;
            return next();
        } catch (error) {
            return serverError(req, res, error);
        }
    }

}
module.exports = UserSignUp;