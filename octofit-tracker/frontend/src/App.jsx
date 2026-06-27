import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-5">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking application.</p>
      <Link className="btn btn-primary" to="/about">Learn more</Link>
    </div>
  )
}

function About() {
  return (
    <div className="container py-5">
      <h2>About OctoFit</h2>
      <p>Track activities, manage teams, and compete on leaderboards.</p>
      <Link className="btn btn-outline-secondary" to="/">Back home</Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
