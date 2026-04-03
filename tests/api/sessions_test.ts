import { assertEquals } from "$std/assert/mod.ts";
import { handler } from "../../routes/api/sessions/index.ts";
import { kv } from "../../database.ts";
import { createOng } from "../../repositories/ong_repository.ts";

Deno.test("API - /api/sessions - should create a session for an ONG", async () => {
  const ong = await createOng({
    name: "Session ONG",
    email: "session@test.com",
    whatsapp: "11999999999",
    city: "City",
    uf: "UF"
  });

  const req = new Request("http://localhost/api/sessions", {
    method: "POST",
    body: JSON.stringify({ id: ong!.id! }),
  });

  const resp = await handler.POST!(req, {} as any);
  assertEquals(resp.status, 200);

  const result = await resp.json();
  assertEquals(result.id, ong!.id!);
  assertEquals(result.name, "Session ONG");

  // Cleanup
  await kv.delete(["ong", ong!.id!]);
});

Deno.test("API - /api/sessions - should return 404 for non-existent ONG", async () => {
  const req = new Request("http://localhost/api/sessions", {
    method: "POST",
    body: JSON.stringify({ id: "non-existent" }),
  });

  const resp = await handler.POST!(req, {} as any);
  assertEquals(resp.status, 404);
});
