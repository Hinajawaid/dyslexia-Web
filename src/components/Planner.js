"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";

// Define the shape of a task item
// interface Task {
//   name: string;
//   description: string;
// }

// Define the props for the Planner component
// interface PlannerProps {
//   percentage: number;
//   completedTasks: Task[];
//   incompleteTasks: Task[];
// }

const TaskList = ({ title, tasks }) => (
  <div className="text-center md:text-left">
    <h4 className="font-semibold text-gray-700 mb-2 text-lg">{title}</h4>
    <div
      className=" max-h-40 pr-2 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <ul className="list-none space-y-2 overflow-y-auto ">
        {tasks.map((task, index) => (
          <li key={index}>
            <p className="font-semibold text-black text-xl">{task.name}</p>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Planner = ({ percentage, completedTasks, incompleteTasks }) => {
  // Style for the conic gradient, matching the image (Pink to Purple)
  const gradientStyle = {
    backgroundImage: `conic-gradient(#FF0066 0deg, #6A0DAD ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`, // Pink -> Purple gradient -> Gray
    borderRadius: "50%", // Ensure it's a circle
  };

  //   const scrollRef = useRef(null);
  //   const [scrollPercent, setScrollPercent] = useState(0);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const el = scrollRef.current;
  //       if (!el) return;

  //       const scrollTop = el.scrollTop;
  //       const scrollHeight = el.scrollHeight - el.clientHeight;
  //       const percent = (scrollTop / scrollHeight) * 100;
  //       setScrollPercent(percent);
  //     };

  //     const el = scrollRef.current;
  //     if (el) el.addEventListener("scroll", handleScroll);
  //     return () => {
  //       if (el) el.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-6 tgray-800">Planner Insight</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-center">
        {/* Planner Pie Chart */}
        <div className="flex-shrink-0 ">
          {/* Outer container for padding/background, matching the image's card style */}
          <div className="p-4 rounded-lg ">
            <div
              className="w-40 h-40 relative flex items-center justify-center" // Adjusted size slightly
              style={gradientStyle}
            >
              {/* Inner div for the center hole */}
              <div className="absolute w-[75%] h-[75%] bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500">Completed</span>
                <span className="block text-3xl font-bold text-gray-800">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* List of Tasks Container */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-inner w-full ">
          <h3 className="font-bold mb-4 text-xl text-gray-900">
            List of Task :
          </h3>
          <div className="relative h-50 overflow-hidden">
            {/* Scrollable Task List */}
            <div
              //   ref={scrollRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6  pr-4 h-full"
            >
              <TaskList title="Completed" tasks={completedTasks} />
              <TaskList title="Incomplete" tasks={incompleteTasks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planner;
