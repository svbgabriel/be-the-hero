import { assertEquals, assertExists } from "$std/assert/mod.ts";
import { createIncident, listIncidentsByOng, listIncidentsInfo, deleteIncident, findIncident } from "../../repositories/incident_repository.ts";
import { createOng } from "../../repositories/ong_repository.ts";
import { kv } from "../../database.ts";

Deno.test("IncidentRepository - should create an incident", async () => {
  const incidentData = {
    title: "Test case",
    description: "Test case description",
    value: "120",
    ong_id: "ong123",
  };

  const created = await createIncident(incidentData);

  assertExists(created?.id);
  assertEquals(created?.title, incidentData.title);

  // Cleanup
  await kv.delete(["incident", created!.id!]);
});

Deno.test("IncidentRepository - should list incidents by ONG", async () => {
  const ongId = "ong_unique";
  const incident1 = await createIncident({
    title: "Case 1",
    description: "Descr 1",
    value: "100",
    ong_id: ongId,
  });
  const incident2 = await createIncident({
    title: "Case 2",
    description: "Descr 2",
    value: "200",
    ong_id: "other_ong",
  });

  const incidents = await listIncidentsByOng(ongId);

  assertEquals(incidents.length, 1);
  assertEquals(incidents[0].id, incident1?.id);

  // Cleanup
  await kv.delete(["incident", incident1!.id!]);
  await kv.delete(["incident", incident2!.id!]);
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
    ong_id: ong!.id!,
  });

  const { incidents_info, totalCount } = await listIncidentsInfo(1);

  assertExists(incidents_info.find(i => i.id === incident?.id));
  const info = incidents_info.find(i => i.id === incident?.id);
  assertEquals(info?.name, "Test ONG");
  assertEquals(totalCount >= 1, true);

  // Cleanup
  await kv.delete(["ong", ong!.id!]);
  await kv.delete(["incident", incident!.id!]);
});

Deno.test("IncidentRepository - should find and delete an incident", async () => {
    const created = await createIncident({
        title: "To be deleted",
        description: "...",
        value: "10",
        ong_id: "ong1"
    });

    const found = await findIncident(created!.id!);
    assertEquals(found?.id, created?.id);

    await deleteIncident(created!.id!);
    const foundAfter = await findIncident(created!.id!);
    assertEquals(foundAfter, null);
});
