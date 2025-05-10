"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar"; // Import the new Sidebar component
import Header from "../../components/Header";
import Planner from "../../components/Planner";

export default function PlannerInsight() {
  // Example data for the Planner component
  const [loading, setLoading] = useState(true);
  const [plannerData1, setPlannerData1] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const plannerData = {
    percentage: 72,

    completedTasks: [
      { name: "Task 1", description: "Complete chapter 5 reading." },
      { name: "Task 2", description: "Practice spelling words." },
      { name: "Task 3", description: "Work on phonics sheet." },
      { name: "Task 1", description: "Complete chapter 5 reading." },
      { name: "Task 2", description: "Practice spelling words." },
      { name: "Task 3", description: "Work on phonics sheet." },
    ],
    incompleteTasks: [
      { name: "Task 4", description: "Review sight words." },
      { name: "Task 5", description: "Read for 15 minutes." },
      { name: "Task 6", description: "Planner check-in." },
      { name: "Task 4", description: "Review sight words." },
      { name: "Task 5", description: "Read for 15 minutes." },
      { name: "Task 6", description: "Planner check-in." },
    ],
  };

  const calculateCompletionPercentage = (tasks) => {
    if (!tasks.length) return 0;
    const completedCount = tasks.filter((task) => task.completed).length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  useEffect(() => {
    const fetchPlannerData = async () => {
      console.log("Fetching planner data...");
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.1.75:4000/planner/gettask",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("planner Data:", response.data.data.todos);
        setPlannerData1(response.data.data.todos);

        const tasks = response.data.data.todos;

        // Separate completed and incomplete tasks
        const completed = tasks.filter((task) => task.completed);
        const incomplete = tasks.filter((task) => !task.completed);

        // Save separated arrays
        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);

        setPercentage(calculateCompletionPercentage(tasks));
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlannerData();
    // setLevelData();
  }, []);

  const mainContentStyle = {
    flexGrow: 1,
    padding: "2.5rem", // ~40px
    backgroundColor: "#EDF6F7", // Theme color 2
    fontFamily: "Arial, sans-serif", // Basic font
  };

  const mainHeaderStyle = {
    color: "#000", // Theme color 1
    marginBottom: "1.25rem", // ~20px
    borderBottom: "2px solid #5D3587",
    paddingBottom: "0.625rem", // ~10px
    fontWeight: "bold", // Make it bold
    fontSize: "clamp(1.5rem, 2vw, 2.5rem)",
  };

  const paragraphStyle = {
    color: "#333", // Darker text for readability on light background
    lineHeight: "1.6",
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
            Planner Insight
          </h1>
          {/* Planner Insight Section - Now uses the Planner component */}
          <Planner
            percentage={percentage}
            completedTasks={completedTasks}
            incompleteTasks={incompleteTasks}
          />
          {/* {renderContent()} */}
        </main>
      </div>
    </div>
  );
}
