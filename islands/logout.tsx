import { FiPower } from "react-icons/fi";

export default function Logout() {
  function handleLogout() {
    localStorage.clear();

    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  return (
    <button onClick={handleLogout}>
      <FiPower size={18} color="#E02041" />
    </button>
  );
}
