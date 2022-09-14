// View documentation at: https://docs.begin.com
import { deleteThingy } from '../../../../models/thingies.mjs'

export async function post (req) {
  const id = req.pathParameters?.id

  try {
    await deleteThingy(id)
    return {
      session: {},
      json: null,
      location: '/thingies'
    }
  }
  catch (err) {
    return {
      session: { error: err.message },
      json: { error: err.message },
      location: '/thingies'
    }
  }
}
