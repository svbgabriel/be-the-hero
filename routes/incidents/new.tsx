import { FiArrowLeft } from "@preact-icons/fi";
import NewIncidentForm from "@/islands/NewIncidentForm.tsx";

export default function NewIncident() {
  return (
    <>
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src="/logo.svg" alt="Be The Hero" />

            <h1>Register new case</h1>
            <p>
              Describe the case in detail to find a hero to solve this.
            </p>
            <a className="back-link" href="/profile">
              <FiArrowLeft size={16} color="#E02041" />
              Back to home
            </a>
          </section>
          <NewIncidentForm />
        </div>
      </div>
    </>
  );
}
