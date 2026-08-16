import LogonForm from "@/islands/LogonForm.tsx";

export default function Logon() {
  return (
    <>
      <div className="logon-container">
        <section className="form">
          <img src="/logo.svg" alt="Be The Hero" />
          <LogonForm />
        </section>
        <img src="/heroes.png" alt="Heroes" />
      </div>
    </>
  );
}
