import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGate from "./AuthGate";
<Route 
  path="/dashboard"
  element={
    <AuthGate>
      <Dashboard />
    </AuthGate>
  }
/>
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}