import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import {
  adminPassword,
  adminPasswordHash,
  adminUsername,
  distDir,
  isProduction,
  port,
  rootDir,
  sessionSecret,
  sessionTtlMs,
  uploadsDir,
} from "./config.mjs";
import {
  cleanupSessions,
  createSession,
  deleteSession,
  findSession,
  getContent,
  saveContent,
} from "./database.mjs";
import { safeCompare, tokenHash, verifyPassword } from "./password.mjs";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (/^image\/(png|jpe?g|webp)$/i.test(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Можно загрузить только PNG, JPEG или WebP."));
  },
});

fs.mkdirSync(uploadsDir, { recursive: true });
cleanupSessions();

app.disable("x-powered-by");
app.use(express.json({ limit: "4mb" }));
app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf("=");
        if (idx === -1) return [part, ""];
        return [
          decodeURIComponent(part.slice(0, idx)),
          decodeURIComponent(part.slice(idx + 1)),
        ];
      }),
  );
}

function sessionCookie(token, expiresAt) {
  const parts = [
    `forum360_admin=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Expires=${new Date(expiresAt).toUTCString()}`,
  ];
  if (isProduction) parts.push("Secure");
  return parts.join("; ");
}

function clearSessionCookie() {
  return "forum360_admin=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function getRequestSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.forum360_admin;
  if (!token) return null;
  const hash = tokenHash(token, sessionSecret);
  const session = findSession(hash);
  if (!session) return null;
  return { ...session, tokenHash: hash };
}

function requireAdmin(req, res, next) {
  const session = getRequestSession(req);
  if (!session) {
    res.status(401).json({ message: "Нужно войти в админку." });
    return;
  }
  req.adminSession = session;
  next();
}

function passwordMatches(password) {
  if (adminPasswordHash) return verifyPassword(password, adminPasswordHash);
  if (adminPassword) return safeCompare(password, adminPassword);
  if (!isProduction) return safeCompare(password, "admin");
  return false;
}

function safeSegment(value) {
  return String(value || "media")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "media";
}

function publicUploadUrl(filePath) {
  const relative = path.relative(uploadsDir, filePath).split(path.sep).join("/");
  return `/uploads/${relative}`;
}

app.get("/api/content", (_req, res) => {
  res.json(getContent());
});

app.get("/api/admin/session", (req, res) => {
  const session = getRequestSession(req);
  res.json({ authenticated: Boolean(session), username: session?.username ?? null });
});

app.post("/api/admin/login", (req, res) => {
  const username = String(req.body?.username || "");
  const password = String(req.body?.password || "");

  if (!safeCompare(username, adminUsername) || !passwordMatches(password)) {
    res.status(401).json({ message: "Неверный логин или пароль." });
    return;
  }

  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + sessionTtlMs;
  createSession(tokenHash(token, sessionSecret), username, expiresAt);
  res.setHeader("Set-Cookie", sessionCookie(token, expiresAt));
  res.json({ authenticated: true, username });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  deleteSession(req.adminSession.tokenHash);
  res.setHeader("Set-Cookie", clearSessionCookie());
  res.json({ authenticated: false });
});

app.get("/api/admin/content", requireAdmin, (_req, res) => {
  res.json(getContent());
});

app.put("/api/admin/content", requireAdmin, (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).json({ message: "Некорректные данные контента." });
    return;
  }
  res.json(saveContent(req.body));
});

app.post("/api/admin/upload", requireAdmin, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Файл не передан." });
      return;
    }

    const caseId = safeSegment(req.body?.caseId);
    const targetDir = path.join(uploadsDir, "cases", caseId);
    fs.mkdirSync(targetDir, { recursive: true });

    const filename = `${Date.now()}-${crypto.randomBytes(5).toString("hex")}.webp`;
    const targetPath = path.join(targetDir, filename);

    await sharp(req.file.buffer)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(targetPath);

    res.json({
      id: `${caseId}-${path.basename(filename, ".webp")}`,
      src: publicUploadUrl(targetPath),
      alt: req.body?.alt || "",
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/media", requireAdmin, (req, res) => {
  const src = String(req.body?.src || "").split("?")[0];
  if (!src.startsWith("/uploads/")) {
    res.json({ deleted: false });
    return;
  }
  const relative = src.replace(/^\/uploads\//, "");
  const target = path.resolve(uploadsDir, relative);
  if (!target.startsWith(uploadsDir)) {
    res.status(400).json({ message: "Некорректный путь файла." });
    return;
  }
  if (fs.existsSync(target)) fs.unlinkSync(target);
  res.json({ deleted: true });
});

app.use((error, _req, res, _next) => {
  const message =
    error instanceof Error ? error.message : "Непредвиденная ошибка сервера.";
  res.status(500).json({ message });
});

if (fs.existsSync(path.join(distDir, "index.html"))) {
  app.use(express.static(distDir, { maxAge: "1h" }));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.send(
      "Forum 360 API is running. Start Vite separately with npm run dev:client.",
    );
  });
}

app.listen(port, "127.0.0.1", () => {
  const entry = fileURLToPath(import.meta.url);
  console.log(`Forum 360 server running at http://127.0.0.1:${port}`);
  console.log(`Server entry: ${path.relative(rootDir, entry)}`);
  if (isProduction && !adminPasswordHash && !adminPassword) {
    console.warn("Set ADMIN_PASSWORD_HASH or ADMIN_PASSWORD before production login.");
  }
  if (!isProduction && !adminPasswordHash && !adminPassword) {
    console.warn("Local admin credentials: admin / admin");
  }
});
