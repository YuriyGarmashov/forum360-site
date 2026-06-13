import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const outDir = path.join(root, "content");
const tempDir = path.join(root, "node_modules", ".tmp");
const tempFile = path.join(tempDir, `forum360-default-content-${Date.now()}.mjs`);
const outFile = path.join(outDir, "site-content.json");
const force = process.argv.includes("--force");
const extensions = ["", ".ts", ".tsx", ".js", ".jsx"];

async function resolveAliasPath(importPath) {
  const basePath = path.join(root, "src", importPath.slice(2));
  for (const ext of extensions) {
    const candidate = `${basePath}${ext}`;
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) return candidate;
    } catch {
      // Try the next extension.
    }
  }
  return basePath;
}

try {
  if (!force) {
    await fs.access(outFile);
    console.log(`Content seed already exists: ${path.relative(root, outFile)}`);
    process.exit(0);
  }
} catch {
  // Missing seed file is expected on first run.
}

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(tempDir, { recursive: true });

await build({
  entryPoints: [path.join(root, "src", "content", "defaultContent.ts")],
  outfile: tempFile,
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  logLevel: "silent",
  define: {
    "import.meta.env.BASE_URL": '"/"',
  },
  plugins: [
    {
      name: "forum360-alias",
      setup(buildApi) {
        buildApi.onResolve({ filter: /^@\// }, async (args) => ({
          path: await resolveAliasPath(args.path),
        }));
      },
    },
  ],
});

try {
  const mod = await import(`${pathToFileURL(tempFile).href}?t=${Date.now()}`);
  await fs.writeFile(
    outFile,
    `${JSON.stringify(mod.defaultContent, null, 2)}\n`,
    "utf8",
  );
  console.log(`Wrote ${path.relative(root, outFile)}`);
} finally {
  await fs.rm(tempFile, { force: true });
}
