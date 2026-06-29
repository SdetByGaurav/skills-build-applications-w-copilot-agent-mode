import { useEffect, useState } from 'react';
import { normalizeApiResponse } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const CODESPACE_API_BASE = `https://${codespaceName}-8000.app.github.dev/api`;
const endpoint = codespaceName ? `${CODESPACE_API_BASE}/leaderboard` : '/api/leaderboard';

function renderRecord(record) {
  return Object.entries(record).map(([key, value]) => (
    <li key={key} className="mb-1">
      <strong>{key}</strong>: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
    </li>
  ));
}

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setScores(normalizeApiResponse(payload, API_PATH));
      } catch (err) {
        setError(err?.message ?? 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <h1>Leaderboard</h1>
      <p className="text-muted">
        Data fetched from <code>{endpoint}</code>
      </p>
      {!codespaceName && (
        <div className="alert alert-warning">
          <strong>VITE_CODESPACE_NAME</strong> is not defined. Using a safe fallback to <code>/api</code>.
        </div>
      )}
      {loading && <div className="alert alert-info">Loading leaderboard…</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && scores.length === 0 && (
        <div className="alert alert-secondary">No leaderboard entries found.</div>
      )}
      <div className="row gy-3">
        {scores.map((entry, index) => (
          <div key={entry._id ?? entry.id ?? index} className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entry.name ?? entry.username ?? `Entry ${index + 1}`}</h5>
                <ul className="list-unstyled mb-0">{renderRecord(entry)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
