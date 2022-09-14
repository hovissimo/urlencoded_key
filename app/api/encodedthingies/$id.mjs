// View documentation at: https://docs.begin.com
import {
  getEncodedthingy,
  upsertEncodedthingy,
  validate,
} from "../../../models/encodedthingies.mjs";

export async function get(req) {
  if (req.session.problems) {
    let { problems, encodedthingy, ...session } = req.session;
    return {
      session,
      json: { problems, encodedthingy },
    };
  }

  const id = decodeURIComponent(req.pathParameters?.id);
  const result = await getEncodedthingy(id);
  return {
    json: { encodedthingy: result },
  };
}

export async function post(req) {
  const id = decodeURIComponent(req.pathParameters?.id);

  // Validate
  let { problems, encodedthingy } = await validate.update(req);
  if (problems) {
    return {
      session: { problems, encodedthingy },
      json: { problems, encodedthingy },
      location: `/encodedthingies/${encodedthingy.key}`,
    };
  }

  try {
    const result = await upsertEncodedthingy({ key: id, ...encodedthingy });
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
