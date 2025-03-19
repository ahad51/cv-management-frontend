import React from "react";

const CVPreview = ({ cvData }) => {
  return (
    <div className="cv-preview">
      <h2>{cvData.personalDetails.name}</h2>
      <p>Email: {cvData.personalDetails.email}</p>
      <p>Phone: {cvData.personalDetails.phone}</p>
      <p>Address: {cvData.personalDetails.address}</p>
      
      <h3>Work Experience</h3>
      {cvData.workExperience.map((exp, index) => (
        <div key={index}>
          <h4>{exp.jobTitle} at {exp.company}</h4>
          <p>{exp.startDate} - {exp.endDate}</p>
          <p>{exp.description}</p>
        </div>
      ))}

      <h3>Education</h3>
      {cvData.education.map((edu, index) => (
        <div key={index}>
          <h4>{edu.degree} from {edu.institution}</h4>
          <p>{edu.startDate} - {edu.endDate}</p>
          <p>{edu.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CVPreview;
