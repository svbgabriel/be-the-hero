import { define } from "@/utils.ts";
import { Ong } from "@/model/ong.ts";
import { createOng, listOngs } from "@/repository/ong.repository.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const ongs: Ong[] = await listOngs();
    return new Response(JSON.stringify(ongs));
  },
  async POST(ctx) {
    const body = await ctx.req.json();
    const { name, email, whatsapp, city, uf } = body;

    const ong: Ong = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    const result = await createOng(ong);
    if (!result) {
      return new Response(JSON.stringify({ error: "Something went wrong." }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify(result));
  },
});
