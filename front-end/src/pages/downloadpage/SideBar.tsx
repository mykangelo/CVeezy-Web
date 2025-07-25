import React, { useState } from "react";

const Sidebar = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const [active, setActive] = useState("Templates");
  const [fontSize, setFontSize] = useState("Normal");
  const [font, setFont] = useState("Montserrat");
  const [sectionSpacing, setSectionSpacing] = useState(50);
  const [paragraphSpacing, setParagraphSpacing] = useState(30);
  const [lineSpacing, setLineSpacing] = useState(70);

  const fontSizeValue =
    fontSize === "Small" ? "12px" :
    fontSize === "Large" ? "18px" :
    "16px";

  const resetFormatting = () => {
    setFontSize("Normal");
    setFont("Montserrat");
    setSectionSpacing(50);
    setParagraphSpacing(30);
    setLineSpacing(70);
  };

  return (
    <div
      style={{
        width: "280px",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "24px 0 0 0",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation buttons section */}
      <nav style={{ marginBottom: "24px", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "12px 24px",
            background: active === "Templates" ? "#f3f4f6" : "transparent",
            border: "none",
            fontWeight: 500,
            color: active === "Templates" ? "#009cff" : "#374151",
            cursor: "pointer",
          }}
          onClick={() => setActive("Templates")}
        >
          <span role="img" aria-label="Templates"></span> Templates
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "12px 24px",
            background: active === "Design" ? "#f3f4f6" : "transparent",
            border: "none",
            fontWeight: 500,
            color: active === "Design" ? "#009cff" : "#374151",
            cursor: "pointer",
          }}
          onClick={() => setActive("Design")}
        >
          <span role="img" aria-label="Design & Formatting"></span> Design & Formatting
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "12px 24px",
            background: active === "Spell" ? "#f3f4f6" : "transparent",
            border: "none",
            fontWeight: 500,
            color: active === "Spell" ? "#009cff" : "#374151",
            cursor: "pointer",
          }}
          onClick={() => setActive("Spell")}
        >
          <span role="img" aria-label="Spell check"></span> Spell Check
        </button>
      </nav>

      {/* Section content */}
      <section style={{ flex: 1, overflowY: "auto" }}>
        {active === "Templates" && (
          <div style={{ padding: "0 24px", fontFamily: font, fontSize: fontSizeValue }}>
            <h2 style={{ fontWeight: 700, fontSize: "24px", marginBottom: "12px" }}>Templates</h2>
            <hr style={{ marginBottom: "18px", borderColor: "#e5e7eb" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              {[1, 2, 3, 4].map((id) => (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  style={{ all: "unset", cursor: "pointer" }}
                >
                  <img
                    src={`/templates/template${id}.png`}
                    alt={`Template ${id}`}
                    style={{
                      width: "100%",
                      border: "1px solid #eee",
                      borderRadius: "6px"
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {active === "Design" && (
          <div style={{ padding: "0 24px" }}>
            <h2 style={{ fontWeight: 700, fontSize: "24px", marginBottom: "12px" }}>Design & Formatting</h2>
            <hr style={{ marginBottom: "18px", borderColor: "#e5e7eb" }} />

            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, marginBottom: "8px" }}>Font style</div>
              <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
                {["Small", "Normal", "Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    style={{
                      border: fontSize === size ? "2px solid #009cff" : "1px solid #bcdffb",
                      background: fontSize === size ? "#f5fbff" : "#fff",
                      borderRadius: "12px",
                      padding: "12px 18px",
                      fontWeight: fontSize === size ? 700 : 500,
                      color: "#1a3e6b",
                      fontSize: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "60px",
                      boxShadow: fontSize === size ? "0 0 0 2px #bcdffb" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "28px", marginBottom: "2px" }}>A</span>
                    <span style={{ fontSize: "13px", fontWeight: 400 }}>{size}</span>
                  </button>
                ))}
              </div>

              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Font</div>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #bcdffb",
                  fontSize: "16px",
                  marginBottom: "18px",
                }}
              >
                <option value="Montserrat">Montserrat</option>
                <option value="Arial">Arial</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Section spacing</div>
              <input
                type="range"
                min={0}
                max={100}
                value={sectionSpacing}
                onChange={(e) => setSectionSpacing(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#009cff" }}
              />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Paragraph spacing</div>
              <input
                type="range"
                min={0}
                max={100}
                value={paragraphSpacing}
                onChange={(e) => setParagraphSpacing(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#009cff" }}
              />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Line spacing</div>
              <input
                type="range"
                min={0}
                max={100}
                value={lineSpacing}
                onChange={(e) => setLineSpacing(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#009cff" }}
              />
            </div>
            <button
              onClick={resetFormatting}
              style={{
                background: "none",
                border: "none",
                color: "#009cff",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "8px",
                fontSize: "15px",
              }}
            >
              <span style={{ fontSize: "18px" }}>↺</span> Reset to Default
            </button>
          </div>
        )}

        {active === "Spell" && (
          <div style={{ padding: "0 24px" }}>
            <h2 style={{ fontWeight: 700, fontSize: "24px", marginBottom: "8px", display: "flex", alignItems: "center" }}>
              Spell check
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  marginLeft: "8px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#22C55E" />
                  <path
                    d="M4 7.5L6.2 9.5L10 5.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>
            <hr style={{ marginBottom: "18px", borderColor: "#e5e7eb" }} />
            <div style={{ color: "#374151", lineHeight: "1.5" }}>
              No spelling errors detected. You can continue editing other sections or finish your resume now.
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
