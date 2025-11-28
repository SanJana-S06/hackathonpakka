import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./src/navigationPages/HomePage";
import SearchDashboard from "./src/navigationPages/searchdashbaord";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/searchdashboard" element={<SearchDashboard />} />
      </Routes>
    </Router>
  );
}

