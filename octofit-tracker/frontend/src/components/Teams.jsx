import { useEffect, useState } from 'react';
import { buildApiEndpoint, normalizeApiResponse, codespaceName } from './api.js';

const API_PATH = 'teams';
const endpoint = buildApiEndpoint(API_PATH);

function renderRecord(record) {
  return Object.entries(record).map(([key, value]) => (
    <li key={key} className="mb-1">
      <strong>{key}</strong>: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
    </li>
  ));
}

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setTeams(normalizeApiResponse(payload, API_PATH));
      } catch (err) {
        setError(err?.message ?? 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <h1>Teams</h1>
      <p className="text-muted">
        Data fetched from <code>{endpoint}</code>
      </p>
      {!codespaceName && (
        <div className="alert alert-warning">
          <strong>VITE_CODESPACE_NAME</strong> is not defined. Using a safe fallback to <code>/api</code>.
        </div>
      )}
      {loading && <div className="alert alert-info">Loading teams…</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams found.</div>
      )}
      <div className="row gy-3">
        {teams.map((team, index) => (
          <div key={team._id ?? team.id ?? index} className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name ?? `Team ${index + 1}`}</h5>
                <ul className="list-unstyled mb-0">{renderRecord(team)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
