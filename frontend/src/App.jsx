import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Houses from './pages/Houses';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/houses" element={< Houses />} />
          <Route path="/tenants" element={< Tenants />} />
          <Route path="/payments" element={< Payments />} />

        </Routes>
      </Router>

    </>

  )
}

export default App
