import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import JoinOrganization from "./pages/JoinOrganization";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<JoinOrganization />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

