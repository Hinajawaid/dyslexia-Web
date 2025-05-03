import Sidebar from "../../components/Sidebar"; // Import the new Sidebar component

export default function ActivityLog() {
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
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar initialActiveIndex={4} />{" "}
        <div style={mainContentStyle}>
          <h1 style={mainHeaderStyle}>Activity Log</h1>
          {/* Add main page content here */}
          <p style={paragraphStyle}>
            This is the main content area for resources. Use this space to
            provide helpful links, articles, tools, or other information
            relevant to dyslexia identification and support.
          </p>
        </div>
      </div>
    </>
  );
}
