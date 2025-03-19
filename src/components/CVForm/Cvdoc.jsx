import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 12, marginBottom: 5 }
});

const CVDocument = ({ cvData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{cvData.personalDetails.name}</Text>
        <Text style={styles.text}>Email: {cvData.personalDetails.email}</Text>
        <Text style={styles.text}>Phone: {cvData.personalDetails.phone}</Text>
        <Text style={styles.text}>Address: {cvData.personalDetails.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Work Experience</Text>
        {cvData.workExperience.map((exp, index) => (
          <View key={index}>
            <Text style={styles.text}>{exp.jobTitle} at {exp.company}</Text>
            <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Education</Text>
        {cvData.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.text}>{edu.degree} from {edu.institution}</Text>
            <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
            <Text style={styles.text}>{edu.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CVDocument;
