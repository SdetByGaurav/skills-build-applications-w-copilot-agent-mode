export const getPort = () => Number(process.env.PORT || 8000);

export const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return process.env.API_BASE_URL || 'http://localhost:8000';
};
