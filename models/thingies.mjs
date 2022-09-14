import data from '@begin/data'
import { validator } from '@begin/validator'
import { Thingy } from '../app/schemas/thingy.mjs'

const deleteThingy = async function (key) {
    return data.destroy({ table: 'thingies', key })
}

const upsertThingy = async function (thingy) {
    return data.set({ table: 'thingies', ...thingy })
}

const getThingy = async function (key) {
    return data.get({ table: 'thingies', key })
}

const getThingies = async function () {
    return data.get({ table: 'thingies' })
}

const validate = {
    shared (req) {
        return validator(req, Thingy)
    },
    async create (req) {
        let { valid, problems, data } = validate.shared(req)
        if (req.body.key) {
            problems['key'] = { errors: '<p>should not be included on a create</p>' }
        }
        // Insert your custom validation here
        return !valid ? { problems, thingy: data } : { thingy: data }
    },
    async update (req) {
        let { valid, problems, data } = validate.shared(req)
        // Insert your custom validation here
        return !valid ? { problems, thingy: data } : { thingy: data }
    }
}


export {
    deleteThingy,
    getThingy,
    getThingies,
    upsertThingy,
    validate
}
