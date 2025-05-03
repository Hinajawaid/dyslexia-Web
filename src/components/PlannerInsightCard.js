"use client"; // If using state or effects, otherwise remove

import React from "react";

// Placeholder PieChart component (replace with your actual component or import)
const PlannerPieChart = ({ percentage }) => (
  <div className="w-40 h-40 border-8 border-gray-200 rounded-full flex items-center justify-center relative mb-4 md:mb-0">
    <div
      className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent"
      style={{
        borderImageSlice: 1,
        // Example gradient (adjust colors and percentage)
        borderImageSource: `conic-gradient(#FF0066 ${percentage * 3.6}deg, #6A0DAD ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`,
        transform: `rotate(-90deg)`, // Start gradient from top
      }}
    ></div>
    {/* Inner hole */}
    <div className="absolute w-[75%] h-[75%] bg-white rounded-full z-10 flex items-center justify-center flex-col">
      <span className="text-xs text-gray-500">Completed</span>
      <span className="block text-2xl font-semibold">{percentage}%</span>
    </div>
  </div>
);

// Task item component including description
const TaskItem = ({ name, description }) => (
  <li className="border-t pt-2 pb-2">
    <p className="font-medium">{name}</p>
    <p className="text-sm text-gray-600 pl-2">{description}</p>
  </li>
);

const PlannerInsightCard = ({
  percentage,
  completedTasks,
  incompleteTasks,
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Planner Insight
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Planner Pie Chart */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <PlannerPieChart percentage={percentage} />
        </div>

        {/* List of Tasks */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Completed Tasks */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-lg">
              Completed Tasks:
            </h3>
            {completedTasks && completedTasks.length > 0 ? (
              <ul className="list-none space-y-1 bg-gray-50 p-3 rounded">
                {completedTasks.map((task, index) => (
                  <TaskItem
                    key={`comp-${index}`}
                    name={task.name}
                    description={task.description}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No completed tasks.</p>
            )}
          </div>

          {/* Incomplete Tasks */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-lg">
              Incomplete Tasks:
            </h3>
            {incompleteTasks && incompleteTasks.length > 0 ? (
              <ul className="list-none space-y-1 bg-gray-50 p-3 rounded">
                {incompleteTasks.map((task, index) => (
                  <TaskItem
                    key={`incomp-${index}`}
                    name={task.name}
                    description={task.description}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No incomplete tasks.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlannerInsightCard;
