import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCV } from "../../services/api";
import "./cvForm.css";

const CVForm = ({ token }) => {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState({
    personalDetails: { name: "", email: "", phone: "", address: "", linkedIn: "", github: "" },
    workExperience: [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", startDate: "", endDate: "", description: "" }]
  });

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;
    setCvData((prevData) => {
      if (section === "personalDetails") {
        return { ...prevData, personalDetails: { ...prevData.personalDetails, [name]: value } };
      } else {
        const updatedSection = [...prevData[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        return { ...prevData, [section]: updatedSection };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCV(cvData, token);
      navigate("/cv-preview", { state: { cvData } }); 
    } catch (error) {
      console.error("Error creating CV", error);
    }
  };

  return (
    <div className="cv-container">
              <h2>Create Your CV</h2>
      <form onSubmit={handleSubmit} className="cv-form">
        <h3>Personal Information</h3>
        <div className="form-group">
          <input type="text" name="name" placeholder="Name" onChange={(e) => handleChange(e, "personalDetails")} required />
          <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e, "personalDetails")} required />
          <input type="text" name="phone" placeholder="Phone" onChange={(e) => handleChange(e, "personalDetails")} required />
          <input type="text" name="address" placeholder="Address" onChange={(e) => handleChange(e, "personalDetails")} />
          <input type="url" name="linkedIn" placeholder="LinkedIn" onChange={(e) => handleChange(e, "personalDetails")} />
          <input type="url" name="github" placeholder="GitHub" onChange={(e) => handleChange(e, "personalDetails")} />
        </div>

        <h3>Work Experience</h3>
        {cvData.workExperience.map((exp, index) => (
          <div key={index} className="form-group">
            <input type="text" name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(e, "workExperience", index)} />
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, "workExperience", index)} />
            <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, "workExperience", index)} />
            <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, "workExperience", index)} />
            <textarea name="description" placeholder="Job Description" value={exp.description} onChange={(e) => handleChange(e, "workExperience", index)} />
          </div>
        ))}

        <h3>Education</h3>
        {cvData.education.map((edu, index) => (
          <div key={index} className="form-group">
            <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, "education", index)} />
            <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, "education", index)} />
            <input type="date" name="startDate" value={edu.startDate} onChange={(e) => handleChange(e, "education", index)} />
            <input type="date" name="endDate" value={edu.endDate} onChange={(e) => handleChange(e, "education", index)} />
            <textarea name="description" placeholder="Course Description" value={edu.description} onChange={(e) => handleChange(e, "education", index)} />
          </div>
        ))}

        <button type="submit" className="submit-btn">Create CV</button>
      </form>
    </div>
  );
};

export default CVForm;
