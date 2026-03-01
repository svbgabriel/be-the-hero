import { FiPower } from "react-icons/fi";

export default function Logout() {
  function handleLogout() {
    localStorage.clear();
    globalThis.location.href = "/";
  }

  return (
    <button onClick={handleLogout}>
      <FiPower size={18} color="#E02041" />
    </button>
  );
}
