"use client";

import { cvData } from "@/constants/cv.const";
import { projects } from "@/constants/projects.const";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/types/projects.types";

export const PDFExportContent = () => {
  const { t } = useLanguage();

  const allSkills = [
    ...cvData.skills.frontend,
    ...cvData.skills.mobile,
    ...cvData.skills.backend,
    ...cvData.skills.ecommerce,
    ...cvData.skills.tools,
    ...cvData.skills.other,
  ];

  const teal = "#20b2aa";
  const dark = "#2c2c2c";
  const light = "#f5f5f5";

  return (
    <div
      className="pdf-export-content"
      style={{
        width: "210mm",
        height: "297mm",
        background: "white",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        display: "flex",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR – DARK */}
      <div
        style={{
          width: "35%",
          backgroundColor: dark,
          color: "white", // ← Text stays white here
          padding: "30px 25px",
          boxSizing: "border-box",
        }}
      >
        {/* Name & Title */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            {t("cv.name").toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "#b0b0b0",
              margin: "8px 0 0",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {cvData.personalInfo.title.toUpperCase()}
          </p>
        </div>

        {/* Profile */}
        <SectionTitle title="PROFILE" accentColor={teal} />
        <p
          style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#d0d0d0",
            marginBottom: "18px",
          }}
        >
          {t("cv.professionalSummaryText")}
        </p>

        {/* Contact */}
        <SectionTitle title="CONTACT" accentColor={teal} />
        <div
          style={{
            fontSize: "11px",
            lineHeight: "1.8",
            color: "#d0d0d0",
            marginBottom: "18px",
          }}
        >
          <div>Location Yerevan, Armenia</div>
          <div>Phone: {cvData.personalInfo.phone || "+374-xx-xxx-xxx"}</div>
          <div>Email: {cvData.personalInfo.email}</div>
          <div>Website: narek-qolyan-cv.vercel.app</div>
          <div>GitHub: github.com/narek941</div>
          <div>LinkedIn: linkedin.com/in/narek-qolyan-4a92b611b</div>
        </div>

        {/* Languages */}
        <SectionTitle title="LANGUAGES" accentColor={teal} />
        {cvData.languages.map((lang, i) => {
          const progressWidth =
            lang.name === "Armenian"
              ? "100%"
              : lang.name === "Russian"
              ? "95%"
              : "85%";

          return (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div
                style={{ fontSize: "11px", fontWeight: "bold", color: "white" }}
              >
                {lang.name}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#aaaaaa",
                  marginBottom: "4px",
                }}
              >
                {lang.level}
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#444444",
                  height: "6px",
                  borderRadius: "3px",
                }}
              >
                <div
                  style={{
                    width: progressWidth,
                    backgroundColor: teal,
                    height: "100%",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN – LIGHT */}
      <div
        className="pdf-export-right-column"
        style={{
          width: "65%",
          backgroundColor: light,
          color: "#333333",
          padding: "30px 25px",
          boxSizing: "border-box",
        }}
      >
        {/* Work Experience */}
        <SectionTitle title="WORK EXPERIENCE" accentColor={teal} rightSide />
        {cvData.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "0 0 4px",
                color: dark,
              }}
            >
              {exp.position}
            </h3>
            <p
              style={{
                fontSize: "11px",
                color: teal,
                fontWeight: "600",
                margin: "0 0 6px",
              }}
            >
              {exp.company} • {exp.location} • {exp.period}
            </p>
            <p
              style={{ fontSize: "11px", lineHeight: "1.6", color: "#555555" }}
            >
              {exp.company === "ShellLogix"
                ? t("cv.shelllogix.description")
                : exp.company === "Opta Sports (by Stats Perform)"
                ? t("cv.opta.description")
                : exp.companyDescription}
            </p>
          </div>
        ))}

        {/* Education */}
        <SectionTitle title="EDUCATION" accentColor={teal} rightSide />
        {cvData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "0 0 4px",
                color: dark,
              }}
            >
              {t("cv.education.degree")} ({edu.period})
            </h3>
            <p
              style={{
                fontSize: "11px",
                color: teal,
                fontWeight: "600",
                margin: "0 0 4px",
              }}
            >
              {t("cv.education.institution")}
            </p>
            <p
              style={{ fontSize: "11px", color: "#555555", lineHeight: "1.5" }}
            >
              Department of Agriculture Marketing & Business • Yerevan, Armenia
            </p>
          </div>
        ))}

        {/* Selected Projects */}
        <SectionTitle title="SELECTED PROJECTS" accentColor={teal} rightSide />
        {projects.slice(0, 4).map((project: Project) => (
          <div key={project.id} style={{ marginBottom: "18px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "0 0 4px",
                color: dark,
              }}
            >
              {project.name}
            </h3>
            <p
              style={{ fontSize: "11px", lineHeight: "1.6", color: "#555555" }}
            >
              {t(`projects.${project.id}.description`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Section Title
const SectionTitle = ({
  title,
  accentColor,
  rightSide = false,
}: {
  title: string;
  accentColor: string;
  rightSide?: boolean;
}) => (
  <div style={{ marginBottom: rightSide ? "15px" : "18px" }}>
    <div
      style={{
        width: "40px",
        height: "4px",
        backgroundColor: accentColor,
        marginBottom: "8px",
      }}
    />
    <h2
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        margin: 0,
        color: rightSide ? "#2c2c2c" : "white", // ← Black on right, white on left
      }}
    >
      {title}
    </h2>
  </div>
);
