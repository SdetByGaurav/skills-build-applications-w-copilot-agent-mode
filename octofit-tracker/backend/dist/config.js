"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return process.env.API_BASE_URL || 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
