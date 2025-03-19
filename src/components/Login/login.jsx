import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(user);
      
      console.log("Stored Token:", localStorage.getItem("token")); 
  
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  
  
  

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
