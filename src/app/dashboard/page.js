import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

// Removed Header/Footer imports

export default function Dashboard() {
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
    <div className="flex h-screen overflow-hidden bg-[#EDF6F7]">
      {/* Light theme background */}
      {/* Sticky Sidebar */}
      <Sidebar />
      {/* Main Area (Header + Scrollable Content) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />
        {/* Scrollable Content Area */}
        <main className="flex-1 flex-row overflow-y-auto scrollbar-hide p-6 mt-2">
          {" "}
          {/* Primary scroll area */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-[#5D3587]">
            Dashboard
          </h1>
          <div className="flex flex-col items-center justify-center">
            <h1>Welcome to DyslexiAid</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
