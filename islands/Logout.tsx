import { FiPower } from "@preact-icons/fi";

export default function Logout() {
  async function handleLogout() {
    try {
      await fetch("/api/sessions", { method: "DELETE" });
    }
    catch (_err) {
      // Ignore network errors on logout
    }
    localStorage.clear();
    globalThis.location.href = "/";
  }

  return (
    <button type="button" onClick={handleLogout}>
      <FiPower size={18} color="#E02041" />
    </button>
  );
}
