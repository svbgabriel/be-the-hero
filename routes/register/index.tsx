import { FiArrowLeft } from "@preact-icons/fi";
import RegisterForm from "@/islands/RegisterForm.tsx";

export default function Register() {
  return (
    <>
      <div className="register-container">
        <div className="content">
          <section>
            <img src="/logo.svg" alt="Be The Hero" />

            <h1>Register</h1>
            <p>
              Register, enter the platform and help people find your NGO's cases.
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
