import { asset, Head } from "$fresh/runtime.ts";
import LogonForm from "../islands/LogonForm.tsx";

export default function Logon() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/home.css" />
      </Head>
      <div className="logon-container">
        <section className="form">
          <img src={asset("/logo.svg")} alt="Be The Hero" />
          <LogonForm />
        </section>
        <img src={asset("/heroes.png")} alt="Heroes" />
      </div>
    </>
  );
}
