/** Public static paths with Vite base (e.g. /forum360-site/ on GitHub Pages). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}
