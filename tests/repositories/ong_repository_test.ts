import { assertEquals, assertExists } from "$std/assert/mod.ts";
import { createOng, listOngs, findOng } from "../../repositories/ong_repository.ts";
import { kv } from "../../database.ts";

Deno.test("OngRepository - should create an ONG", async () => {
  const ongData = {
    name: "APAD",
    email: "contato@apad.com.br",
    whatsapp: "47999999999",
    city: "Rio do Sul",
    uf: "SC",
  };

  const createdOng = await createOng(ongData);

  assertExists(createdOng?.id);
  assertEquals(createdOng?.name, ongData.name);

  // Cleanup
  await kv.delete(["ong", createdOng!.id!]);
});

Deno.test("OngRepository - should list ONGs", async () => {
  const ong1 = await createOng({
    name: "ONG 1",
    email: "ong1@test.com",
    whatsapp: "11999999999",
    city: "São Paulo",
    uf: "SP",
  });

  const ongs = await listOngs();
  
  assertExists(ongs.find(o => o.id === ong1?.id));
  
  // Cleanup
  await kv.delete(["ong", ong1!.id!]);
});

Deno.test("OngRepository - should find an ONG by ID", async () => {
  const created = await createOng({
    name: "Find Me",
    email: "find@me.com",
    whatsapp: "11999999999",
    city: "São Paulo",
    uf: "SP",
  });

  const found = await findOng(created!.id!);
  
  assertEquals(found?.id, created?.id);
  assertEquals(found?.name, "Find Me");

  // Cleanup
  await kv.delete(["ong", created!.id!]);
});
