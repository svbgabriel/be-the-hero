import { assertEquals } from "@std/assert";
import { handler } from "@/routes/api/incidents/index.ts";
import { db } from "@/database.ts";
import { createOng } from "@/repository/ong.repository.ts";

Deno.test("API - /api/incidents - should create an incident", async () => {
  const ong = await createOng({
    name: "Incident ONG",
    email: "inc@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF",
  });

  const incidentData = {
    title: "API Incident",
    description: "API Description",
    value: "150",
  };

  const req = new Request("http://localhost/api/incidents", {
    method: "POST",
    headers: {
      "authorization": ong!.id!,
    },
    body: JSON.stringify(incidentData),
  });

  const ctx = {
    req,
    state: { ongId: ong!.id! },
  } as unknown as Parameters<NonNullable<typeof handler.POST>>[0];

  const resp = await handler.POST!(ctx);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(result.title, incidentData.title);
  assertEquals(result.ongId, ong!.id!);

  // Cleanup
  db.prepare("DELETE FROM incidents WHERE id = ?").run(result.id);
  db.prepare("DELETE FROM ongs WHERE id = ?").run(ong!.id!);
});

Deno.test("API - /api/incidents - should return 401 if no authorization", async () => {
  const req = new Request("http://localhost/api/incidents", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const ctx = {
    req,
    state: {},
  } as unknown as Parameters<NonNullable<typeof handler.POST>>[0];

  const resp = await handler.POST!(ctx);
  assertEquals(resp.status, 401);
});

Deno.test("API - /api/incidents - should list incidents", async () => {
  const req = new Request("http://localhost/api/incidents?page=1", {
    method: "GET",
  });

  const ctx = { req } as unknown as Parameters<NonNullable<typeof handler.GET>>[0];
  const resp = await handler.GET!(ctx);
  assertEquals(resp.status, 200);
  assertEquals(resp.headers.has("X-Total-Count"), true);

  const result = await resp.json();
  assertEquals(Array.isArray(result), true);
});
