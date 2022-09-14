// View documentation at: https://docs.begin.com
import {
  getEncodedthingies,
  getEncodedthingy,
  upsertEncodedthingy,
  validate,
} from "../../models/encodedthingies.mjs";

export async function get(req) {
  // force upsert a thingy with a goofy base64 key just to demo the urlencoding issue
  // I found this issue while trying to store an openId subject as a base64 string, it
  // included a '+' and a '/'.
  //
  // Delete the encodedthingy and you can see that the delete succeeded because created_at will be
  // updated.  I don't have a more idiomatic way of demoing this without thinking hard.
  const key = "MC40NDc3NzEzNzIzNT+I1/MDMz==";
  if (!(await getEncodedthingy(key))) {
    upsertEncodedthingy({ created_at: new Date().toISOString(), key });
  }

  const encodedthingies = await getEncodedthingies();
  if (req.session.problems) {
    let { problems, encodedthingy, ...session } = req.session;
    return {
      session,
      json: { problems, encodedthingies, encodedthingy },
    };
  }

  return {
    json: { encodedthingies },
  };
}

export async function post(req) {
  // Validate
  let { problems, encodedthingy } = await validate.create(req);
  if (problems) {
    return {
      session: { problems, encodedthingy },
      json: { problems, encodedthingy },
      location: "/encodedthingies",
    };
  }

  try {
    const result = await upsertEncodedthingy(encodedthingy);
    return {
      session: {},
      json: { encodedthingy: result },
      location: "/encodedthingies",
    };
  } catch (err) {
    return {
      session: { error: err.message },
      json: { error: err.message },
      location: "/encodedthingies",
    };
  }
}
