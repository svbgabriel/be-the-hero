import { Handlers } from "$fresh/server.ts";
import { Incident } from "../../../types/incident.ts";
import { listIncidentsByOng } from "../../../repositories/incident_repository.ts";

export const handler: Handlers<Incident | null> = {
  async GET(req, _ctx) {
    const ong_id = req.headers.get("authorization");

    if (!ong_id) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
      });
    }

    const incidents = await listIncidentsByOng(ong_id);

    return new Response(JSON.stringify(incidents));
  },
};
