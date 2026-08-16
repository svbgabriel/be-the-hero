import { crypto } from "@std/crypto";
import { Incident } from "@/model/incident.ts";
import { db } from "@/database.ts";
import { IncidentInfo } from "@/model/incident-info.ts";

export const createIncident = async (incident: Incident) => {
  incident.id = crypto.randomUUID();
  try {
    const stmt = db.prepare(
      "INSERT INTO incidents (id, title, description, value, ong_id) VALUES (?, ?, ?, ?, ?)",
    );
    stmt.run(incident.id, incident.title, incident.description, incident.value, incident.ongId);
    await Promise.resolve();
    return incident;
  }
  catch {
    await Promise.resolve();
    return undefined;
  }
};

export const listIncidentsByOng = async (ongId: string) => {
  const stmt = db.prepare(
    "SELECT id, title, description, value, ong_id AS ongId FROM incidents WHERE ong_id = ?",
  );
  const incidents = stmt.all(ongId) as Incident[];
  await Promise.resolve();
  return incidents;
};

export const listIncidentsInfo = async (page = 1) => {
  const countStmt = db.prepare("SELECT COUNT(*) as count FROM incidents");
  const totalCount = (countStmt.get() as { count: number }).count;

  const limit = 5;
  const offset = (page - 1) * 5;

  const stmt = db.prepare(`
    SELECT 
      i.id, i.title, i.description, i.value, i.ong_id AS ongId,
      o.name, o.email, o.whatsapp, o.city, o.uf
    FROM incidents i
    JOIN ongs o ON i.ong_id = o.id
    LIMIT ? OFFSET ?
  `);

  const incidents_info = stmt.all(limit, offset) as IncidentInfo[];

  await Promise.resolve();
  return { incidents_info, totalCount };
};

export const deleteIncident = async (id: string) => {
  const stmt = db.prepare("DELETE FROM incidents WHERE id = ?");
  stmt.run(id);
  await Promise.resolve();
};

export const findIncident = async (id: string) => {
  const stmt = db.prepare(
    "SELECT id, title, description, value, ong_id AS ongId FROM incidents WHERE id = ?",
  );
  const incident = stmt.get(id) as Incident | undefined;
  await Promise.resolve();
  return incident;
};
