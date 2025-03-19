import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Login from "../src/components/Login/login";
import Register from "../src/components/Signup/signup";
import Dashboard from "../src/components/Dashboard/dashboard";
import CVForm from "../src/components/CVForm/cvForm";
import CVPreviewPage from"../src/components/CVPreview/cvPreview";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cv/create" element={<CVForm />} />
        <Route path="/cv-preview" element={<CVPreviewPage />} />

      </Routes>
    </Router>
  );
};

export default App;
