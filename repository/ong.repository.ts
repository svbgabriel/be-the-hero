import { Ong } from "@/model/ong.ts";
import { db } from "@/database.ts";

export const createOng = async (ong: Ong) => {
  ong.id = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  try {
    const stmt = db.prepare(
      "INSERT INTO ongs (id, name, email, whatsapp, city, uf) VALUES (?, ?, ?, ?, ?, ?)",
    );
    stmt.run(ong.id, ong.name, ong.email, ong.whatsapp, ong.city, ong.uf);
    await Promise.resolve();
    return ong;
  }
  catch {
    await Promise.resolve();
    return undefined;
  }
};

export const listOngs = async () => {
  const stmt = db.prepare("SELECT id, name, email, whatsapp, city, uf FROM ongs");
  const ongs = stmt.all() as Ong[];
  await Promise.resolve();
  return ongs;
};

export const findOng = async (id: string) => {
  const stmt = db.prepare("SELECT id, name, email, whatsapp, city, uf FROM ongs WHERE id = ?");
  const ong = stmt.get(id) as Ong | undefined;
  await Promise.resolve();
  return ong;
};
