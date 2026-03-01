import { useState } from "preact/hooks";
import { FiLogIn } from "react-icons/fi";

export default function LogonForm() {
  const [id, setId] = useState("");

  async function handleLogin(e: Event) {
    e.preventDefault();

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", data.name);

      globalThis.location.href = "/profile";
    } catch (_err) {
      alert("Login failed, please try again.");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in</h1>
      <input
        placeholder="Your ID"
        type="text"
        value={id}
        onInput={(e) => setId((e.target as HTMLInputElement).value)}
      />
      <button className="button" type="submit">
        Log in
      </button>
      <a className="back-link" href="/register">
        <FiLogIn size={16} color="#E02041" />
        I don't have an account
      </a>
    </form>
  );
}
