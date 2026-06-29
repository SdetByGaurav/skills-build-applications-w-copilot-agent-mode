"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const config_1 = require("./config");
const codespaceName = process.env.CODESPACE_NAME;
const codespacesUrl = codespaceName
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.app = (0, express_1.default)();
const port = (0, config_1.getPort)();
exports.app.use(express_1.default.json());
exports.app.use(routes_1.default);
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: codespacesUrl });
});
const startServer = () => {
    (0, database_1.connectDatabase)()
        .then(() => {
        exports.app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
        });
    })
        .catch((error) => {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    });
};
exports.startServer = startServer;
