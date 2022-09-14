import data from '@begin/data'
import { validator } from '@begin/validator'
import { Encodedthingy } from '../app/schemas/encodedthingy.mjs'

const deleteEncodedthingy = async function (key) {
    return data.destroy({ table: 'encodedthingies', key })
}

const upsertEncodedthingy = async function (encodedthingy) {
    return data.set({ table: 'encodedthingies', ...encodedthingy })
}

const getEncodedthingy = async function (key) {
    return data.get({ table: 'encodedthingies', key })
}

const getEncodedthingies = async function () {
    return data.get({ table: 'encodedthingies' })
}

const validate = {
    shared (req) {
        return validator(req, Encodedthingy)
    },
    async create (req) {
        let { valid, problems, data } = validate.shared(req)
        if (req.body.key) {
            problems['key'] = { errors: '<p>should not be included on a create</p>' }
        }
        // Insert your custom validation here
        return !valid ? { problems, encodedthingy: data } : { encodedthingy: data }
    },
    async update (req) {
        let { valid, problems, data } = validate.shared(req)
        // Insert your custom validation here
        return !valid ? { problems, encodedthingy: data } : { encodedthingy: data }
    }
}


export {
    deleteEncodedthingy,
    getEncodedthingy,
    getEncodedthingies,
    upsertEncodedthingy,
    validate
}
