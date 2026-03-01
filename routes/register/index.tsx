import { asset, Head } from "$fresh/runtime.ts";
import { FiArrowLeft } from "react-icons/fi";
import RegisterForm from "../../islands/RegisterForm.tsx";

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

            <h1>Register</h1>
            <p>
              Register, enter the platform and help people find your NGO's
              cases.
            </p>
            <a className="back-link" href="/">
              <FiArrowLeft size={16} color="#E02041" />
              Back
            </a>
          </section>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
