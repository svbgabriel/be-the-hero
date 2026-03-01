import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "preact/hooks";
import { Incident } from "../types/incident.ts";

export default function IncidentsList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const ongId = localStorage.getItem("ongId");
    if (!ongId) return;

    const fetchData = async () => {
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: ongId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    };

    fetchData().catch();
  }, []);

  const handleDeleteIncident = async (id: string) => {
    const ongId = localStorage.getItem("ongId");
    try {
      const response = await fetch(`/api/incidents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: ongId!,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (_err) {
      alert("Error deleting case, please try again.");
    }
  };

  return (
    <>
      <h1>Registered cases</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASE:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>
            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BRL",
              }).format(Number(incident.value))}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id!)}>
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
