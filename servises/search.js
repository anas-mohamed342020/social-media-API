const search = async (model, skip, limit, searchKey, fields) => {
    let data;
    if (searchKey) {
        const column = [
            ...fields.map((field) => {
                return { [field]: { $regex: searchKey } }
            })
        ]
        data = await model.find({ $or: column }).limit(limit).skip(skip)

    } else {
        data = await model.find({}).limit(limit).skip(skip)
    }
    return data
}


module.exports = {
    search
}