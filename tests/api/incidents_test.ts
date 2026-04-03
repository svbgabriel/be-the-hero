import { assertEquals } from "$std/assert/mod.ts";
import { handler } from "../../routes/api/incidents/index.ts";
import { kv } from "../../database.ts";
import { createOng } from "../../repositories/ong_repository.ts";

Deno.test("API - /api/incidents - should create an incident", async () => {
  const ong = await createOng({
    name: "Incident ONG",
    email: "inc@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF"
  });

  const incidentData = {
    title: "API Incident",
    description: "API Description",
    value: "150"
  };

  const req = new Request("http://localhost/api/incidents", {
    method: "POST",
    headers: {
      "authorization": ong!.id!
    },
    body: JSON.stringify(incidentData),
  });

  const resp = await handler.POST!(req, {} as any);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(result.title, incidentData.title);
  assertEquals(result.ong_id, ong!.id!);

  // Cleanup
  await kv.delete(["ong", ong!.id!]);
  await kv.delete(["incident", result.id]);
});

Deno.test("API - /api/incidents - should return 401 if no authorization", async () => {
  const req = new Request("http://localhost/api/incidents", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const resp = await handler.POST!(req, {} as any);
  assertEquals(resp.status, 401);
});

Deno.test("API - /api/incidents - should list incidents", async () => {
  const req = new Request("http://localhost/api/incidents?page=1", {
    method: "GET",
  });

  const resp = await handler.GET!(req, {} as any);
  assertEquals(resp.status, 200);
  assertEquals(resp.headers.has("X-Total-Count"), true);

  const result = await resp.json();
  assertEquals(Array.isArray(result), true);
});
