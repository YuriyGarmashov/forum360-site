import { spawn } from "node:child_process";

const clientPort = process.env.E2E_PORT || process.env.VITE_PORT || "5174";
const serverPort = process.env.PORT || "8787";

const server = spawn("node", ["server/index.mjs"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: serverPort },
});

const vite = spawn("npm", ["run", "dev:client", "--", "--port", clientPort, "--strictPort"], {
  stdio: "inherit",
  shell: true,
});

function shutdown(signal) {
  server.kill(signal);
  vite.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

server.on("exit", (code) => {
  if (code && code !== 0) process.exit(code);
});

vite.on("exit", (code) => {
  if (code && code !== 0) process.exit(code);
});
