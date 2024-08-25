import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "preact/hooks";
import { Incident } from "../types/incident.ts";
import {
  deleteIncident,
  listIncidentsByOng,
} from "../repositories/incident_repository.ts";

export default function IncidentsList() {
  const ongId = localStorage.getItem("ongId")!;
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const incidents: Incident[] = await listIncidentsByOng(ongId);

      setIncidents(incidents);
    };

    fetchData().catch();
  }, [ongId]);

  const handleDeleteIncident = async (id: string) => {
    try {
      await deleteIncident(id);

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (_err) {
      throw Error("Erro ao deletar caso, tente novamente.");
    }
  };

  return (
    <>
      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
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
