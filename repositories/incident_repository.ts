import { crypto } from "jsr:@std/crypto";
import { Incident } from "../types/incident.ts";
import { kv } from "../database.ts";
import { Ong } from "../types/ong.ts";
import { IncidentInfo } from "../types/incident_info.ts";

export const createIncident = async (incident: Incident) => {
  incident.id = crypto.randomUUID();
  const incidentKey = ["incident", incident.id!];
  const ok = await kv.atomic().set(incidentKey, incident).commit();

  if (ok) {
    return incident;
  } else {
    return undefined;
  }
};

export const listIncidentsByOng = async (ongId: string) => {
  const incidents: Incident[] = [];

  for await (const res of kv.list<Incident>({ prefix: ["incident"] })) {
    incidents.push(res.value);
  }

  return incidents.filter((incident) => {
    return incident.ong_id === ongId;
  });
};

export const listIncidentsInfo = async () => {
  const incidents: Incident[] = [];
  for await (const res of kv.list<Incident>({ prefix: ["incident"] })) {
    incidents.push(res.value);
  }

  const ongs: Ong[] = [];
  for await (const res of kv.list<Ong>({ prefix: ["ong"] })) {
    ongs.push(res.value);
  }

  const incidents_info: IncidentInfo[] = [];
  for (const incident of incidents) {
    const ong = ongs.find((ong) => {
      return ong.id === incident.ong_id;
    });
    if (!ong) {
      continue;
    }
    incidents_info.push({
      incident,
      name: ong.name,
      email: ong.email,
      whatsapp: ong.whatsapp,
      city: ong.city,
      uf: ong.uf,
    });
  }

  return incidents_info;
};

export const deleteIncident = async (id: string) => {
  const incidentKey = ["incident", id];
  await kv.delete(incidentKey);
};

export const findIncident = async (id: string) => {
  const incidentKey = ["incident", id];
  return (await kv.get<Incident>(incidentKey)).value;
};
