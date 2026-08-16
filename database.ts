import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE IF NOT EXISTS ongs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    city TEXT NOT NULL,
    uf TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    value TEXT NOT NULL,
    ong_id TEXT NOT NULL,
    FOREIGN KEY (ong_id) REFERENCES ongs(id)
  );
`);
