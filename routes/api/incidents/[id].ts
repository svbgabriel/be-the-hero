import { Handlers } from "$fresh/server.ts";
import {
  deleteIncident,
  findIncident,
} from "../../../repositories/incident_repository.ts";

export const handler: Handlers<undefined | null> = {
  async DELETE(req, ctx) {
    const { id } = ctx.params;
    const ong_id = req.headers.get("authorization");

    const incident = await findIncident(id);

    if (!incident) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    if (incident.ong_id !== ong_id) {
      return new Response(
        JSON.stringify({ error: "Operation not permitted" }),
        { status: 401 },
      );
    }

    await deleteIncident(id);

    return new Response(null, { status: 204 });
  },
};
