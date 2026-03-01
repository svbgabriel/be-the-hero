import { Handlers } from "$fresh/server.ts";
import { Incident } from "../../../types/incident.ts";
import {
  createIncident,
  listIncidentsInfo,
} from "../../../repositories/incident_repository.ts";

export const handler: Handlers<Incident | null> = {
  async POST(req, _ctx) {
    const body = await req.json();
    const { title, description, value } = body;
    const ong_id = req.headers.get("authorization");

    if (!ong_id) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
      });
    }

    const incident: Incident = {
      title,
      description,
      value,
      ong_id,
    };

    const result = await createIncident(incident);
    if (!result) {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(result));
  },
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;

    const { incidents_info, totalCount } = await listIncidentsInfo(page);

    const headers = new Headers();
    headers.set("X-Total-Count", totalCount.toString());

    return new Response(JSON.stringify(incidents_info), { headers });
  },
};
