// View documentation at: https://docs.begin.com
import { getThingy, upsertThingy, validate } from '../../../models/thingies.mjs'

export async function get (req) {
  if (req.session.problems) {
    let { problems, thingy, ...session } = req.session
    return {
      session,
      json: { problems, thingy }
    }
  }

  const id = req.pathParameters?.id
  const result = await getThingy(id)
  return {
    json: { thingy: result }
  }
}

export async function post (req) {
  const id = req.pathParameters?.id

  // Validate
  let { problems, thingy } = await validate.update(req)
  if (problems) {
    return {
      session: { problems, thingy },
      json: { problems, thingy },
      location: `/thingies/${thingy.key}`
    }
  }

  try {
    const result = await upsertThingy({key: id, ...thingy})
    return {
      session: {},
      json: { thingy: result },
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
