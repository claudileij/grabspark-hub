
/**
 * Decodifica um JWT (sem verificar assinatura).
 * Retorna o payload como objeto JS.
 */
export function decodeJwt<T = any>(token: string): T | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    // Adiciona padding caso necessário
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4 === 0 ? 0 : 4 - (base64.length % 4);
    const base64Padded = base64 + "=".repeat(pad);
    const decoded = atob(base64Padded);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}
