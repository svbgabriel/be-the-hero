import {Ong} from "../types/ong.ts";
import {kv} from "../database.ts";

export const createOng = async (ong: Ong) => {
  ong.id = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const ongKey = ["ong", ong.id!];
  const ok = await kv.atomic().set(ongKey, ong).commit();

  if (ok) {
    return ong;
  } else {
    return undefined;
  }
};

export const listOngs = async () => {
  const ongs: Ong[] = [];
  for await (const res of kv.list<Ong>({ prefix: ["ong"] })) {
    ongs.push(res.value);
  }
  return ongs;
};

export const findOng = async (id: string) => {
  const ongKey = ["ong", id];
  return (await kv.get<Ong>(ongKey)).value;
};
