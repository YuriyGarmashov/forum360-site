import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(__dirname, "..");

export const isProduction = process.env.NODE_ENV === "production";
export const port = Number(process.env.PORT || 8787);
export const dataDir = path.resolve(
  process.env.FORUM360_DATA_DIR || path.join(rootDir, "storage"),
);
export const uploadsDir = path.resolve(
  process.env.FORUM360_UPLOADS_DIR || path.join(dataDir, "uploads"),
);
export const databasePath = path.resolve(
  process.env.FORUM360_DATABASE || path.join(dataDir, "forum360.sqlite"),
);
export const seedContentPath = path.join(rootDir, "content", "site-content.json");
export const distDir = path.join(rootDir, "dist");

export const adminUsername = process.env.ADMIN_USERNAME || "admin";
export const adminPassword = process.env.ADMIN_PASSWORD || "";
export const adminPasswordHash =
  process.env.ADMIN_PASSWORD_HASH ||
  "scrypt$_fXsd39SLCHwZDChF54Ocw$-EVx0SK20RdGgkLYVHPUDRb1xn4yqPpfxRhJYBfmVB-X0Brh73Dz5gp-73OwLHKLbJLto2OEZKLP4vo5omNj0g";
export const sessionSecret =
  process.env.SESSION_SECRET || "forum360-local-session-secret-change-in-production";
export const sessionTtlMs = Number(process.env.SESSION_TTL_MS || 1000 * 60 * 60 * 24 * 7);
