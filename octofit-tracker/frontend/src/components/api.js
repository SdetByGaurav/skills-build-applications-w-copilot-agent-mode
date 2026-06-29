export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export function getApiBaseUrl() {
  if (typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  const origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  return `${origin}/api`;
}

export function buildApiEndpoint(resource) {
  const normalized = `${resource}`.replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/${normalized}`;
}

export function normalizeApiResponse(payload, responseKey) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items;
  }
  if (responseKey && Array.isArray(payload?.[responseKey])) {
    return payload[responseKey];
  }
  return [];
}
