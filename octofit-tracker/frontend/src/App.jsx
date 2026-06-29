import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/about', label: 'About' },
]

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-5">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking application.</p>
      <p>
        Navigate to users, teams, activities, workouts, or leaderboard data powered by the backend API.
      </p>
      <p className="small text-muted">
        Ensure <code>VITE_CODESPACE_NAME</code> is defined in <code>.env.local</code> for remote Codespaces API routing.
      </p>
    </div>
  )
}

function About() {
  return (
    <div className="container py-5">
      <h2>About OctoFit</h2>
      <p>Track activities, manage teams, and compete on leaderboards.</p>
      <p className="small text-muted">
        The frontend uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build safe API URLs.
      </p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNavbar"
            aria-controls="octofitNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navLinks.map(link => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
