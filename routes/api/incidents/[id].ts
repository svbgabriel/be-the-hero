import { define } from "@/utils.ts";
import { deleteIncident, findIncident } from "@/repository/incident.repository.ts";

export const handler = define.handlers({
  async DELETE(ctx) {
    const { id } = ctx.params;
    const ongId = ctx.state?.ongId;

    if (!ongId) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
      });
    }

    const incident = await findIncident(id);

    if (!incident) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    if (incident.ongId !== ongId) {
      return new Response(
        JSON.stringify({ error: "Operation not permitted" }),
        { status: 401 },
      );
    }

    await deleteIncident(id);

    return new Response(null, { status: 204 });
  },
});
