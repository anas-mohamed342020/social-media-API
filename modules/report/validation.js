const Joi = require('joi')


const createReport = {
    body: Joi.object().required().keys({
        reportComment: Joi.string().required(),
        postID: Joi.string().required().max(24).min(24)
    })
}
const blockVal = {
    body: Joi.object().required().keys({
        id: Joi.string().required().max(24).min(24)
    })
}
const nodata= {
    body: Joi.object().required().keys({
    })
}
const search = {
    params: Joi.object().required().keys({
        searchKey: Joi.string().required()
    })

}
module.exports = {createReport,blockVal,nodata,search}