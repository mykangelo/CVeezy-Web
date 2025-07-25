import React, { useState } from "react";

// Modal component
const DownloadModal = ({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        minWidth: "350px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Create an account to get your resume</h2>
      <input
        type="email"
        placeholder="Email Address"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        onClick={onDownload}
        style={{
          background: "#009cff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        Save & Next
      </button>
      <br />
      <a href="#" onClick={onClose} style={{ color: "#009cff", textDecoration: "underline" }}>
        Already have an account?
      </a>
      <div style={{ marginTop: "18px", textAlign: "left" }}>
        <div style={{ background: "#f5f7fa", borderRadius: "8px", padding: "12px" }}>
          <b>Now for the finishing touches!</b>
          <ul style={{ margin: "8px 0 0 18px", fontSize: "14px" }}>
            <li>⭐ Use our variety of tools to create your professionally designed resume</li>
            <li>⭐ Utilize expert pre-written content to match you to the right job</li>
            <li>⭐ Download in PDF or Word format</li>
            <li>⭐ All your information is safe every step of the way</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const DownloadPDFButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    setShowModal(true);
  };

  const handleModalSaveAndNext = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        style={{
          background: "#009cff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 24px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
      {showModal && (
        <DownloadModal
          onClose={() => setShowModal(false)}
          onDownload={handleModalSaveAndNext}
        />
      )}
    </>
  );
};

export default DownloadPDFButton;
