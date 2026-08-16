import { define } from "@/utils.ts";
import { findOng } from "@/repository/ong.repository.ts";
import { deleteCookie, setCookie } from "@std/http/cookie";

export const handler = define.handlers({
  async POST(ctx) {
    const body = await ctx.req.json();
    const { id } = body;

    const ong = await findOng(id);
    if (!ong) {
      return new Response(JSON.stringify({ error: "Something went wrong." }), {
        status: 404,
      });
    }

    const headers = new Headers({ "Content-Type": "application/json" });
    setCookie(headers, {
      name: "session",
      value: ong.id!,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    });

    return new Response(JSON.stringify(ong), { status: 200, headers });
  },
  DELETE(_ctx) {
    const headers = new Headers();
    deleteCookie(headers, "session", { path: "/" });
    return new Response(null, { status: 204, headers });
  },
});
