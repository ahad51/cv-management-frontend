import { useLocation } from "react-router-dom";
import CVPreview from "../CVForm/CvPreview";
import CVDocument from "../CVForm/Cvdoc";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./cvPreview.css"
const CVPreviewPage = () => {
  const location = useLocation();
  const { cvData } = location.state || {};

  if (!cvData) {
    return <p className="no-data-message">No CV data available.</p>;
  }

  return (
    <div className="cv-preview-container">
      <h2 className="cv-title">Your CV</h2>
      <div className="cv-content">
        <CVPreview cvData={cvData} />
        <PDFDownloadLink document={<CVDocument cvData={cvData} />} fileName="CV.pdf">
          {({ loading }) => (
            <button className="download-btn">{loading ? "Generating PDF..." : "Download PDF"}</button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CVPreviewPage;
