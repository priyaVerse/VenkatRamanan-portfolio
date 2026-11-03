/** Force every lazy image to load so nothing is blank in the print preview / PDF. */
export function loadAllImages(): Promise<void> {
  const imgs = Array.from(document.images);
  imgs.forEach((img) => {
    img.loading = 'eager';
  });
  return Promise.all(
    imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))),
  ).then(() => undefined);
}

export async function printPortfolio(): Promise<void> {
  await loadAllImages();
  window.print();
}

/** Also prepare images when the user presses Ctrl/Cmd+P instead of using the button. */
export function installPrintHooks(): () => void {
  const handler = () => {
    document.images && Array.from(document.images).forEach((img) => (img.loading = 'eager'));
  };
  window.addEventListener('beforeprint', handler);
  return () => window.removeEventListener('beforeprint', handler);
}
