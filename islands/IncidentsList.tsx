import { FiTrash2 } from "@preact-icons/fi";
import { useState } from "preact/hooks";
import { Incident } from "@/model/incident.ts";

interface IncidentsListProps {
  initialIncidents?: Incident[];
}

export default function IncidentsList({ initialIncidents = [] }: IncidentsListProps) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);

  const handleDeleteIncident = async (id: string) => {
    try {
      const response = await fetch(`/api/incidents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    }
    catch (_err) {
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

            <button type="button" onClick={() => handleDeleteIncident(incident.id!)}>
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
