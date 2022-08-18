const Joi = require('joi')

const postValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required()
    })
}

const updatePostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        id: Joi.string().required().max(24).min(24)
    })
}
const idValidation = {
    body: Joi.object().required().keys({
        id: Joi.string().required().max(24).min(24)
    })
}

const noData = {
    body: Joi.object().required().keys({
    })
}

const search = {
    params: Joi.object().required().keys({
        searchKey: Joi.string().required()
    })

}


module.exports = { postValidation, updatePostValidation, idValidation ,noData,search}