// View documentation at: https://docs.begin.com
import {
  getThingies,
  getThingy,
  upsertThingy,
  validate,
} from "../../models/thingies.mjs";

export async function get(req) {
  // force upsert a thingy with a goofy base64 key just to demo the urlencoding issue
  // I found this issue while trying to store an openId subject as a base64 string, it
  // included a '+' and a '/'.
  //
  // You can't delete this thingy because the unencoded key will 404 at
  // `/thingies/MC40NDc3NzEzNzIzNT+I1/MDMz==/delete`
  const key = "MC40NDc3NzEzNzIzNT+I1/MDMz==";
  if (!(await getThingy(key))) {
    upsertThingy({ name: new Date().toISOString(), key });
  }

  const thingies = await getThingies();
  if (req.session.problems) {
    let { problems, thingy, ...session } = req.session;
    return {
      session,
      json: { problems, thingies, thingy },
    };
  }

  return {
    json: { thingies },
  };
}

export async function post(req) {
  // Validate
  let { problems, thingy } = await validate.create(req);
  if (problems) {
    return {
      session: { problems, thingy },
      json: { problems, thingy },
      location: "/thingies",
    };
  }

  try {
    const result = await upsertThingy(thingy);
    return {
      session: {},
      json: { thingy: result },
      location: "/thingies",
    };
  } catch (err) {
    return {
      session: { error: err.message },
      json: { error: err.message },
      location: "/thingies",
    };
  }
}
