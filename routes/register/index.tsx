import { FreshContext, Handlers } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { FiArrowLeft } from "react-icons/fi";
import { Access } from "../../types/access.ts";
import { Ong } from "../../types/ong.ts";
import { createOng } from "../../repositories/ong_repository.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    return await ctx.render();
  },
  async POST(req: Request, _ctx: FreshContext) {
    const form = await req.formData();
    const name = form.get("name")?.toString()!;
    const email = form.get("email")?.toString()!;
    const whatsapp = form.get("whatsapp")?.toString()!;
    const city = form.get("city")?.toString()!;
    const uf = form.get("uf")?.toString()!;

    const data: Ong = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    const ong = await createOng(data);
    if (!ong) {
      throw Error("Erro no cadastro, tente novamente.");
    }

    const access: Access = { id: ong.id! };

    const headers = new Headers();
    headers.set("location", `/register/${access.id}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Register() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/register.css" />
      </Head>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={asset("/logo.svg")} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>
            <a className="back-link" href="/">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar
            </a>
          </section>
          <form method="post">
            <input
              type="text"
              placeholder="Nome da ONG"
              value=""
              name="name"
            />
            <input
              type="email"
              placeholder="E-mail"
              value=""
              name="email"
            />
            <input
              type="text"
              placeholder="Whatsapp"
              value=""
              name="whatsapp"
            />
            <div className="input-group">
              <input
                type="text"
                placeholder="Cidade"
                value=""
                name="city"
              />
              <input
                type="text"
                placeholder="UF"
                style={{ width: 80 }}
                value=""
                name="uf"
              />
            </div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
