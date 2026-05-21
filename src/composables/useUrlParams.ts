export function useUrlStats() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  return { url, params };
}