import { Incident } from "./incident.ts";

export type IncidentInfo = {
  incident: Incident;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
};
