import { assertEquals } from "@std/assert";
import { handler } from "@/routes/api/ongs/index.ts";
import { db } from "@/database.ts";

Deno.test("API - /api/ongs - should create an ONG", async () => {
  const ongData = {
    name: "API ONG",
    email: "api@test.com",
    whatsapp: "11999999999",
    city: "São Paulo",
    uf: "SP",
  };

  const req = new Request("http://localhost/api/ongs", {
    method: "POST",
    body: JSON.stringify(ongData),
  });

  const ctx = { req } as unknown as Parameters<NonNullable<typeof handler.POST>>[0];
  const resp = await handler.POST!(ctx);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(result.name, ongData.name);

  // Cleanup
  db.prepare("DELETE FROM ongs WHERE id = ?").run(result.id);
});

Deno.test("API - /api/ongs - should list ONGs", async () => {
  const req = new Request("http://localhost/api/ongs", {
    method: "GET",
  });

  const ctx = { req } as unknown as Parameters<NonNullable<typeof handler.GET>>[0];
  const resp = await handler.GET!(ctx);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(Array.isArray(result), true);
});
