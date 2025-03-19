import { useEffect, useState } from "react";
import { fetchCVs } from "../../services/api";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);  // Default state as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const response = await fetchCVs(getToken());
        const data = response?.data || [];  // Ensure data is always an array
        setCvs(Array.isArray(data) ? data : []);  // Prevent undefined/null
      } catch (error) {
        console.error("Failed to fetch CVs", error);
        setCvs([]);  // Set to empty array on error
      }
    };

    loadCVs();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Create Your CV</h1>
      <button className="create-btn" onClick={() => navigate("/cv/create")}>
        Create CV
      </button>


    </div>
  );
};

export default Dashboard;
