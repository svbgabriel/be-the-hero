import { Handlers } from "$fresh/server.ts";
import { Ong } from "../../../types/ong.ts";
import { createOng, listOngs } from "../../../repositories/ong_repository.ts";

export const handler: Handlers<Ong | null> = {
  async GET(_req, _ctx) {
    const ongs: Ong[] = await listOngs();
    return new Response(JSON.stringify(ongs));
  },
  async POST(req, _ctx) {
    const body = await req.json();
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
};
