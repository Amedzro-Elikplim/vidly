const Joi = require("joi");

const validateNewGenre = Joi.object(
    {
        name: Joi.string().required(),
    }
)

module.exports = {
    validateNewGenre
}