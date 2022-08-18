const Joi = require('joi')

const signUpSchema = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        location: Joi.string().required(),
        phone: Joi.number().required(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
    })
}
const signInSchema = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}
const token = {
    params: Joi.object().required().keys({
        token: Joi.string().required()
    })
}
const updateScheme = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        location: Joi.string().required(),
        phone: Joi.number().required(),
    })
}
const updatePassScheme = {
    body: Joi.object().required().keys({

        oPassword: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        nPassword: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cnPassword: Joi.ref('nPassword'),
    })
}
const changePassword = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),

        aCode: Joi.string().required().length(6),

        nPassword: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cnPassword: Joi.ref('nPassword'),
    }),


}
const reportv = {
    body: Joi.object().required().keys({
        id: Joi.string().required().max(24).min(24)
    })
}
const search = {
    params: Joi.object().required().keys({
        searchKey: Joi.string().required()
    })

}
const noData = {
    body: Joi.object().required().keys({
    })
}

const sendACode = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email()
    })

}

module.exports = { signUpSchema, signInSchema, token, updateScheme, reportv, updatePassScheme, noData, changePassword, sendACode,search }