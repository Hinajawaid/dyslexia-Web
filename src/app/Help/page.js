import Sidebar from "../../components/Sidebar";
// Removed Header/Footer imports

export default function Help() {
  // Restored old inline styles definitions
  const mainContentStyle = {
    flexGrow: 1,
    padding: "2.5rem",
    backgroundColor: "#EDF6F7",
    fontFamily: "Arial, sans-serif",
  };
  const mainHeaderStyle = {
    color: "#000",
    marginBottom: "1.25rem",
    borderBottom: "2px solid #5D3587",
    paddingBottom: "0.625rem",
    fontWeight: "bold",
    fontSize: "clamp(1.5rem, 2vw, 2.5rem)",
  };
  const paragraphStyle = {
    color: "#333",
    lineHeight: "1.6",
  };

  return (
    // Reverted layout structure
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={mainContentStyle}>
        <h1 style={mainHeaderStyle}>Help & Support</h1>
        <p style={paragraphStyle}>
          Find answers to your questions and support information here.
          {/* Add more Help components/content here, e.g., FAQs, contact form */}
        </p>
      </div>
    </div>
  );
}
