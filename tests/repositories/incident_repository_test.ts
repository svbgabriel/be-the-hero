import { assertEquals, assertExists } from "@std/assert";
import {
  createIncident,
  deleteIncident,
  findIncident,
  listIncidentsByOng,
  listIncidentsInfo,
} from "@/repository/incident.repository.ts";
import { createOng } from "@/repository/ong.repository.ts";
import { db } from "@/database.ts";

Deno.test("IncidentRepository - should create an incident", async () => {
  const ong = await createOng({
    name: "Test ONG",
    email: "test@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF",
  });

  const incidentData = {
    title: "Test case",
    description: "Test case description",
    value: "120",
    ongId: ong!.id!,
  };

  const created = await createIncident(incidentData);

  assertExists(created?.id);
  assertEquals(created?.title, incidentData.title);

  // Cleanup
  db.prepare("DELETE FROM incidents WHERE id = ?").run(created!.id!);
  db.prepare("DELETE FROM ongs WHERE id = ?").run(ong!.id!);
});

Deno.test("IncidentRepository - should list incidents by ONG", async () => {
  const ong = await createOng({
    name: "Unique ONG",
    email: "unique@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF",
  });
  const ongId = ong!.id!;

  const incident1 = await createIncident({
    title: "Case 1",
    description: "Descr 1",
    value: "100",
    ongId: ongId,
  });

  const incidents = await listIncidentsByOng(ongId);

  assertEquals(incidents.length, 1);
  assertEquals(incidents[0].id, incident1?.id);

  // Cleanup
  db.prepare("DELETE FROM incidents WHERE id = ?").run(incident1!.id!);
  db.prepare("DELETE FROM ongs WHERE id = ?").run(ongId);
});

Deno.test("IncidentRepository - should list incidents with ONG info (paginated)", async () => {
  // Create ONG
  const ong = await createOng({
    name: "Test ONG",
    email: "test@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF",
  });

  // Create Incident for this ONG
  const incident = await createIncident({
    title: "Info Case",
    description: "Info Descr",
    value: "50",
    ongId: ong!.id!,
  });

  const { incidents_info, totalCount } = await listIncidentsInfo(1);

  assertExists(incidents_info.find((i) => i.id === incident?.id));
  const info = incidents_info.find((i) => i.id === incident?.id);
  assertEquals(info?.name, "Test ONG");
  assertEquals(totalCount >= 1, true);

  // Cleanup
  db.prepare("DELETE FROM incidents WHERE id = ?").run(incident!.id!);
  db.prepare("DELETE FROM ongs WHERE id = ?").run(ong!.id!);
});

Deno.test("IncidentRepository - should find and delete an incident", async () => {
  const ong = await createOng({
    name: "Del ONG",
    email: "del@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF",
  });

  const created = await createIncident({
    title: "To be deleted",
    description: "...",
    value: "10",
    ongId: ong!.id!,
  });

  const found = await findIncident(created!.id!);
  assertEquals(found?.id, created?.id);

  await deleteIncident(created!.id!);
  const foundAfter = await findIncident(created!.id!);
  assertEquals(foundAfter, undefined);

  // Cleanup
  db.prepare("DELETE FROM ongs WHERE id = ?").run(ong!.id!);
});
