import { FreshContext, Handlers } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { FiLogIn } from "react-icons/fi";
import { findOng } from "../repositories/ong_repository.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    return await ctx.render();
  },
  async POST(req: Request, _ctx: FreshContext) {
    const form = await req.formData();
    const id = form.get("id")?.toString()!;

    const ong = await findOng(id);

    if (!ong) {
      throw Error("Falha no login, tente novamente.");
    }

    localStorage.setItem("ongId", id);
    localStorage.setItem("ongName", ong.name);

    const headers = new Headers();
    headers.set("location", "/profile");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Logon() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/home.css" />
      </Head>
      <div className="logon-container">
        <section className="form">
          <img src={asset("/logo.svg")} alt="Be The Hero" />
          <form method="post">
            <h1>Faça seu logon</h1>
            <input
              placeholder="Sua ID"
              type="text"
              value=""
              name="id"
            />
            <button className="button" type="submit">
              Entrar
            </button>
            <a className="back-link" href="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </a>
          </form>
        </section>
        <img src={asset("/heroes.png")} alt="Heroes" />
      </div>
    </>
  );
}
