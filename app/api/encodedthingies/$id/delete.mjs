// View documentation at: https://docs.begin.com
import { deleteEncodedthingy } from "../../../../models/encodedthingies.mjs";

export async function post(req) {
  const id = decodeURIComponent(req.pathParameters?.id);

  try {
    await deleteEncodedthingy(id);
    return {
      session: {},
      json: null,
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
