import { useEffect, useState } from 'react';
import { normalizeApiResponse } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const CODESPACE_API_BASE = `https://${codespaceName}-8000.app.github.dev/api`;
const endpoint = codespaceName ? `${CODESPACE_API_BASE}/activities` : '/api/activities';

function renderRecord(record) {
  return Object.entries(record).map(([key, value]) => (
    <li key={key} className="mb-1">
      <strong>{key}</strong>: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
    </li>
  ));
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setActivities(normalizeApiResponse(payload, API_PATH));
      } catch (err) {
        setError(err?.message ?? 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <h1>Activities</h1>
      <p className="text-muted">
        Data fetched from <code>{endpoint}</code>
      </p>
      {!codespaceName && (
        <div className="alert alert-warning">
          <strong>VITE_CODESPACE_NAME</strong> is not defined. Using a safe fallback to <code>/api</code>.
        </div>
      )}
      {loading && <div className="alert alert-info">Loading activities…</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activities found.</div>
      )}
      <div className="row gy-3">
        {activities.map((activity, index) => (
          <div key={activity._id ?? activity.id ?? index} className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{activity.type ?? activity.name ?? `Activity ${index + 1}`}</h5>
                <ul className="list-unstyled mb-0">{renderRecord(activity)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
