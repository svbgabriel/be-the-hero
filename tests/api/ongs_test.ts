import { assertEquals } from "$std/assert/mod.ts";
import { handler } from "../../routes/api/ongs/index.ts";
import { kv } from "../../database.ts";

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

  const resp = await handler.POST!(req, {} as any);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(result.name, ongData.name);
  
  // Cleanup
  await kv.delete(["ong", result.id]);
});

Deno.test("API - /api/ongs - should list ONGs", async () => {
  const req = new Request("http://localhost/api/ongs", {
    method: "GET",
  });

  const resp = await handler.GET!(req, {} as any);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(Array.isArray(result), true);
});
