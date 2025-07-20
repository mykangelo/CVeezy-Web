import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ChooseTemplate() {
  const [currentTab, setCurrentTab] = useState<"all" | "favorite">("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const templates: number[] = [1, 2, 3, 4, 5];

  const toggleFavorite = (templateId: number) => {
    setFavorites((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const visibleTemplates = currentTab === "all" ? templates : favorites;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#ffffff",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* Headline and Description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#2B2D42",
            marginBottom: "0.5rem",
          }}
        >
          {currentTab === "all"
            ? "Job-winning templates for you"
            : "Your favorite templates"}
        </h2>
        <p style={{ fontSize: "18px", color: "#4A4A4A" }}>
          {currentTab === "all"
            ? "Simple to use and ready in minutes resume templates — give it a try for free now!"
            : "These templates bring out the best in you!"}
        </p>
        {currentTab === "all" && (
          <a
            href="#"
            style={{
              marginTop: "0.5rem",
              color: "#007bff",
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Choose later
          </a>
        )}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "3rem",
          fontSize: "16px",
        }}
      >
        <span
          onClick={() => setCurrentTab("all")}
          style={{
            cursor: "pointer",
            color: currentTab === "all" ? "#007bff" : "#6c757d",
            fontWeight: currentTab === "all" ? "700" : "500",
            borderBottom: currentTab === "all" ? "2px solid #007bff" : "none",
            paddingBottom: "4px",
          }}
        >
          All Templates
        </span>
        <span
          onClick={() => setCurrentTab("favorite")}
          style={{
            cursor: "pointer",
            color: currentTab === "favorite" ? "#007bff" : "#6c757d",
            fontWeight: currentTab === "favorite" ? "700" : "500",
            borderBottom:
              currentTab === "favorite" ? "2px solid #007bff" : "none",
            paddingBottom: "4px",
          }}
        >
          Favorite Templates
        </span>
      </div>

      {/* Template Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          padding: "3rem 1rem 5rem",
          flexGrow: 1,
        }}
      >
        {visibleTemplates.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#888" }}>
            {currentTab === "favorite"
              ? "You have no favorite templates yet."
              : "No templates found."}
          </p>
        ) : (
          visibleTemplates.map((num) => (
            <div
              key={num}
              onClick={() => navigate("/choose-resume-maker")}
              style={{
                position: "relative",
                width: "180px",
                height: "240px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Template {num}

              {/* Heart Icon */}
              <span
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                  e.stopPropagation();
                  toggleFavorite(num);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "18px",
                  color: favorites.includes(num) ? "red" : "#ccc",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                ♥
              </span>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ChooseTemplate;
