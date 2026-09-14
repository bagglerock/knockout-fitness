export async function requestJson(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15_000) });
  // Never include the URL or response body: provider errors may contain credentials.
  if (!response.ok) throw new Error(`Provider request failed (${response.status})`);
  return response.json();
}
export function safeHttps(value, host) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (!host || url.hostname === host);
  } catch {
    return false;
  }
}
