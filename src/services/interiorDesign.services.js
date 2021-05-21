const INTERIORDESIGN = require('../models/InteriorDesign')
const TYPEINTERIORDESIGN = require('../models/TypeInteriorDesign')



const createNewInteriorDesign = async body => {
    try {
        const { title, project, style, S, description, img, content, FK_TypeInteriorDesign } = body
        const data = {
            title: title,
            info: {
                project: project,
                style: style,
                S: S,
            },
            description: description,
            images: [{
                img: img,
                content: content
            }],
            FK_TypeInteriorDesign: FK_TypeInteriorDesign
        }
        const newInteriorDesign = new INTERIORDESIGN(data)
        await newInteriorDesign.save()

        return {
            message: 'Successfully create InteriorDesign',
            success: true,
            data: newInteriorDesign
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const getInteriorDesign = async () => {
    try {
        const interiorDesign = await INTERIORDESIGN.find({},{_id:1,Images:1,title:1})
        
        return {
            message: 'Successfully get InteriorDesign',
            success: true,
            data: interiorDesign
        }
    } catch (err) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const getInteriorDesignDetail = async (id) => {
    try {
        const interiorDesign = await INTERIORDESIGN.findById(id)
        
        return {
            message: 'Successfully get InteriorDesign',
            success: true,
            data: interiorDesign
        }
    } catch (err) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const getAllInteriorDesignByType = async (query) => {
    try {
        let idInteriorDesign = query.idInteriorDesign
        let perPage = ~~query.limit || 12
        let page = ~~query.page || 1
        let asc = query.asc == 'true' || true
        let bodySort = (query.sortByName == 'true')
            ? {
                Name: 1,
            }
            : {
                Price: asc ? 1 : -1,
            } || {}
        const result = await INTERIORDESIGN.find({ FK_TypeInteriorDesign: idInteriorDesign })
            .sort(bodySort)
            .skip(perPage * page - perPage)
            .limit(perPage)

        return {
            message: "Successfully get product",
            success: true,
            data: result,
        }
    } catch (error) {
        return {
            message: "An error occurred",
            success: false,
        }
    }
}

const updateInteriorDesign = async (id, body) => {
    try {
        const existInteriorDesign = await INTERIORDESIGN.findOne({ _id: id })
        if (!existInteriorDesign) {
            return {
                message: 'Bill not exist',
                success: false
            }
        }
        await INTERIORDESIGN.updateOne({ _id: id }, body)
        return {
            message: 'Successfully update InteriorDesign',
            success: true,
            data: body
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const deleteInteriorDesign = async id => {
    try {
        const existInteriorDesign = await INTERIORDESIGN.findOne({ _id: id })
        if (!existInteriorDesign) {
            return {
                message: 'Cart not exist',
                success: false
            }
        }

        await BILL.deleteOne({ _id: id })

        return {
            message: 'Successfully delete InteriorDesign',
            success: true
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const createTypeInteriorDesign = async body => {
    try {

        const newTypeInteriorDesign = new TYPEINTERIORDESIGN(body)
        await newTypeInteriorDesign.save()

        return {
            message: 'Successfully create TypeInteriorDesign',
            success: true,
            data: newTypeInteriorDesign
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}


module.exports = {
    createNewInteriorDesign,
    getInteriorDesign,
    updateInteriorDesign,
    deleteInteriorDesign,
    createTypeInteriorDesign,
    getAllInteriorDesignByType,
    getInteriorDesignDetail
}