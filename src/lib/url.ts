/** Resolve a path relative to the site root (works with Vite's `base: './'`). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || './';
  return `${base}${path.replace(/^\/+/, '')}`;
}
