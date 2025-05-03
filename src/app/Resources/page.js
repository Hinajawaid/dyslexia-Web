"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

// --- Define Headings ---
const resourceHeadings = [
  "Understanding Dyslexia",
  "Education and Strategy",
  "Emotional and Social Support",
  "Advocacy and rights",
];

// --- API Configuration (Adjust as needed) ---
const API_BASE_URL = "http://192.168.1.75:4000"; // Your backend URL
const RESOURCES_ENDPOINT = "/resources/"; // Your resources endpoint

// --- Helper to fetch data for a single heading ID ---
async function fetchResourcesForHeading(headingId) {
  const url = `${API_BASE_URL}${RESOURCES_ENDPOINT}`;
  console.log(`Posting to: ${url} with id: ${headingId}`);
  const headingIdString = headingId.toString();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: headingIdString }), // Send id in the body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Expecting a direct array now
    console.log("Data:", data);
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn(
        `Expected an array but received a different data structure for headingId ${headingId}:`,
        data
      );
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching resources for headingId ${headingId}:`,
      error
    );
    throw error;
  }
}

const ResourcesPage = () => {
  // --- State Variables ---
  const [groupedResources, setGroupedResources] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data Effect ---
  useEffect(() => {
    const fetchAllResources = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const promises = resourceHeadings.map(
          (_, index) => fetchResourcesForHeading(index + 1) // Fetch using 1-based index as headingId
        );
        const results = await Promise.all(promises);

        // Group results by heading text
        const groupedData = {};
        resourceHeadings.forEach((heading, index) => {
          groupedData[heading] = results[index] || []; // Assign fetched data or empty array
        });

        console.log("Grouped Data:", groupedData); // Log grouped data for debugging
        setGroupedResources(groupedData);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllResources();
  }, []); // Empty dependency array means this runs once on mount

  // --- Styles for Main Content ---
  const mainContentStyle = {
    flexGrow: 1,
    padding: "2.5rem", // ~40px
    backgroundColor: "#EDF6F7", // Theme color 2
    fontFamily: "Arial, sans-serif", // Basic font
    overflowY: "auto", // Allow scrolling if content overflows
  };

  const mainHeaderStyle = {
    color: "#000",
    marginBottom: "1.5rem", // Adjusted margin
    paddingBottom: "0.625rem", // ~10px
    fontWeight: "bold",
    fontSize: "clamp(1.5rem, 2vw, 2.5rem)",
    borderBottom: "2px solid #5D3587",
  };

  // --- New Styles for Resource Sections ---
  const sectionHeadingStyle = {
    fontSize: "clamp(1rem, 1.6vw, 1.6rem)",
    color: "#4D4D4D",
    marginBottom: "1.5rem",
    marginTop: "1rem",
  };

  const blogsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const blogElementStyle = {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    cursor: "pointer",
  };

  // Simple hover effect style (applied via JS or could use CSS Modules/etc for :hover)
  const blogElementHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };

  const blogImageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover", // Ensures image covers the area without distortion
    display: "block",
    backgroundColor: "#eee", // Background for image area while loading/error
  };

  const blogDescriptionStyle = {
    padding: "1rem",
    fontSize: "0.9rem",
    lineHeight: "1.5",
    color: "#333",
  };

  const separatorStyle = {
    border: 0,
    borderTop: "1px solid #ccc",
    margin: "2.5rem 0",
  };

  const loadingErrorStyle = {
    textAlign: "center",
    padding: "2rem",
    color: "#dc3545", // Error color
    fontSize: "1.1rem",
  };

  // --- Event Handlers for Hover (optional enhancement) ---
  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, blogElementHoverStyle);
  };

  const handleMouseLeave = (e) => {
    // Reset specific hover styles
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = "";
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) {
      return <div style={loadingErrorStyle}>Loading resources...</div>;
    }
    if (error) {
      return <div style={loadingErrorStyle}>{error}</div>;
    }
    if (Object.keys(groupedResources).length === 0) {
      return <div style={loadingErrorStyle}>No resources found.</div>;
    }

    return resourceHeadings.map((heading, sectionIndex) => {
      const blogs = groupedResources[heading] || []; // Get blogs for this heading

      // Don't render section if heading exists but has no blogs
      // if (blogs.length === 0) {
      //   return null;
      // }

      return (
        <section key={heading}>
          <h2 style={sectionHeadingStyle}>{heading}</h2>
          <div style={blogsContainerStyle}>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <a
                  key={blog._id}
                  href={blog.link || "#"} // Use blog.link if available, otherwise fallback to '#'
                  target="_blank"
                  rel="noopener noreferrer"
                  style={blogElementStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  title={blog.title} // Add title attribute for accessibility
                >
                  <img
                    src={`${API_BASE_URL}${blog.image}`} // Construct full image URL
                    alt={blog.title || "Resource image"} // Use title for alt text
                    style={blogImageStyle}
                    onError={(e) => {
                      e.target.style.display = "none"; // Hide the broken image
                    }}
                  />
                  <p style={blogDescriptionStyle}>
                    {blog.description || blog.title}
                  </p>{" "}
                  {/* Use description or title */}
                </a>
              ))
            ) : (
              <p style={{ color: "#666" }}>
                No resources available for this category yet.
              </p> // Message if no blogs for this heading
            )}
          </div>
          {/* Add separator line if not the last section */}
          {sectionIndex < resourceHeadings.length - 1 && (
            <hr style={separatorStyle} />
          )}
        </section>
      );
    });
  };

  return (
    // Overall container
    <div className="flex h-screen overflow-hidden bg-[#EDF6F7]">
      {" "}
      {/* Light theme background */}
      {/* Sticky Sidebar */}
      <Sidebar />
      {/* Main Area (Header + Scrollable Content) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-6 mt-2">
          {" "}
          {/* Primary scroll area */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-[#5D3587]">
            Resources
          </h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ResourcesPage;
