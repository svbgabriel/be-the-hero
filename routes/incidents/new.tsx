import { FreshContext, Handlers } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { FiArrowLeft } from "react-icons/fi";
import { Incident } from "../../types/incident.ts";
import { createIncident } from "../../repositories/incident_repository.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    return await ctx.render();
  },
  async POST(req: Request, _ctx: FreshContext) {
    const form = await req.formData();
    const title = form.get("title")?.toString()!;
    const description = form.get("description")?.toString()!;
    const value = form.get("value")?.toString()!;
    const ongId = localStorage.getItem("ongId")!;

    const data: Incident = {
      title,
      description,
      value,
      ong_id: ongId,
    };

    try {
      await createIncident(data);
    } catch (_err) {
      throw Error("Erro ao cadastrar caso, tente novamente.");
    }

    const headers = new Headers();
    headers.set("location", "/profile");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function NewIncident() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/incidents.css" />
      </Head>
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={asset("/logo.svg")} alt="Be The Hero" />

            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para
              resolver isso.
            </p>
            <a className="back-link" href="/profile">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
            </a>
          </section>
          <form method="post">
            <input
              type="text"
              placeholder="Título do caso"
              value=""
              name="title"
            />
            <textarea
              placeholder="Descrição"
              value=""
              name="description"
            />
            <input
              type="text"
              placeholder="Valor em reais"
              value=""
              name="value"
            />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
