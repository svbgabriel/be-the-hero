import { define } from "@/utils.ts";
import { Incident } from "@/model/incident.ts";
import { createIncident, listIncidentsInfo } from "@/repository/incident.repository.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const body = await ctx.req.json();
    const { title, description, value } = body;
    const ongId = ctx.state?.ongId;

    if (!ongId) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
      });
    }

    const incident: Incident = {
      title,
      description,
      value,
      ongId,
    };

    const result = await createIncident(incident);
    if (!result) {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(result));
  },
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const page = Number(url.searchParams.get("page")) || 1;

    const { incidents_info, totalCount } = await listIncidentsInfo(page);

    const headers = new Headers();
    headers.set("X-Total-Count", totalCount.toString());

    return new Response(JSON.stringify(incidents_info), { headers });
  },
});
