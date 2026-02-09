import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGate from "./AuthGate";
import JoinOrganization from "./pages/JoinOrganization";

<Route 
  path="/dashboard"
  element={
    <AuthGate>
      <Dashboard />
    </AuthGate>
  }
/>

<Route path="/join" element={<JoinOrganization />} />

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}