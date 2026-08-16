import { assertEquals, assertExists } from "@std/assert";
import { createOng, findOng, listOngs } from "@/repository/ong.repository.ts";
import {
  createIncident,
  deleteIncident,
  findIncident,
  listIncidentsByOng,
  listIncidentsInfo,
} from "@/repository/incident.repository.ts";

Deno.test("Database Repository Test", async () => {
  // Test creating an ONg
  const ong = await createOng({
    name: "ONG Teste",
    email: "teste@ong.com",
    whatsapp: "11999999999",
    city: "São Paulo",
    uf: "SP",
  });
  assertExists(ong);
  assertExists(ong.id);

  // Test finding ONg
  const foundOng = await findOng(ong.id!);
  assertExists(foundOng);
  assertEquals(foundOng.name, "ONG Teste");

  // Test listing ONgs
  const ongs = await listOngs();
  assertEquals(ongs.length >= 1, true);

  // Test creating Incident
  const incident = await createIncident({
    title: "Caso Teste",
    description: "Descrição do caso teste",
    value: "100.00",
    ongId: ong.id!,
  });
  assertExists(incident);
  assertExists(incident.id);

  // Test finding Incident
  const foundIncident = await findIncident(incident.id!);
  assertExists(foundIncident);
  assertEquals(foundIncident.title, "Caso Teste");

  // Test listing incidents by ONg
  const incidentsByOng = await listIncidentsByOng(ong.id!);
  assertEquals(incidentsByOng.length, 1);

  // Test listing incidents info
  const info = await listIncidentsInfo(1);
  assertEquals(info.totalCount >= 1, true);
  assertEquals(info.incidents_info.length >= 1, true);

  // Test deleting incident
  await deleteIncident(incident.id!);
  const deleted = await findIncident(incident.id!);
  assertEquals(deleted, undefined);
});
