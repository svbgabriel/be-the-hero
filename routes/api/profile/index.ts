import { define } from "@/utils.ts";
import { listIncidentsByOng } from "@/repository/incident.repository.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const ongId = ctx.state?.ongId;

    if (!ongId) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
      });
    }

    const incidents = await listIncidentsByOng(ongId);

    return new Response(JSON.stringify(incidents));
  },
});
