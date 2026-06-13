import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { databasePath, dataDir, seedContentPath } from "./config.mjs";

fs.mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

function readSeedContent() {
  const raw = fs.readFileSync(seedContentPath, "utf8");
  return JSON.parse(raw);
}

export function getContent() {
  const row = db
    .prepare("SELECT json FROM site_content WHERE id = 1")
    .get();
  if (row?.json) return JSON.parse(row.json);

  const seed = readSeedContent();
  saveContent(seed);
  return seed;
}

export function saveContent(content) {
  const now = new Date().toISOString();
  const payload = {
    ...content,
    version: 1,
    updatedAt: now,
  };

  db.prepare(
    `INSERT INTO site_content (id, json, updated_at)
     VALUES (1, ?, ?)
     ON CONFLICT(id) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at`,
  ).run(JSON.stringify(payload), now);

  return payload;
}

export function createSession(tokenHashValue, username, expiresAt) {
  const now = Date.now();
  db.prepare(
    `INSERT INTO sessions (token_hash, username, expires_at, created_at)
     VALUES (?, ?, ?, ?)`,
  ).run(tokenHashValue, username, expiresAt, now);
}

export function findSession(tokenHashValue) {
  const row = db
    .prepare("SELECT username, expires_at FROM sessions WHERE token_hash = ?")
    .get(tokenHashValue);
  if (!row) return null;
  if (Number(row.expires_at) < Date.now()) {
    deleteSession(tokenHashValue);
    return null;
  }
  return row;
}

export function deleteSession(tokenHashValue) {
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHashValue);
}

export function cleanupSessions() {
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
}
