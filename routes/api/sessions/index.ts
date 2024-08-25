import { Handlers } from "$fresh/server.ts";
import { Ong } from "../../../types/ong.ts";
import { findOng } from "../../../repositories/ong_repository.ts";

export const handler: Handlers<Ong | null> = {
  async POST(req, _ctx) {
    const body = await req.json();
    const { id } = body;

    const ong = await findOng(id);
    if (!ong) {
      return new Response(JSON.stringify({ error: "Something went wrong." }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(ong));
  },
};
