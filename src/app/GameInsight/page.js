"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useState } from "react";
import Planner from "../../components/Planner";

// Placeholder imports - replace with your actual components
const PieChart = ({ percentage }) => {
  const gradientStyle = {
    // backgroundImage: `conic-gradient(#3b82f6 ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`,
    backgroundImage: `conic-gradient(#FF0066 0deg, #6A0DAD ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`, // Pink -> Purple gradient -> Gray
    borderRadius: "50%", // Ensure it's a circle
  };

  return (
    <div
      className="w-32 h-32 rounded-full flex items-center justify-center relative"
      style={gradientStyle}
    >
      {/* Inner div to create the donut hole */}
      <div className="absolute w-[85%] h-[85%] bg-[#EDF6F7] rounded-full flex items-center justify-center">
        <span className="text-lg font-semibold">{percentage}%</span>
      </div>
      {/* <span className="absolute -bottom-4 text-xs text-gray-500">Completed</span> */}
    </div>
  );
};
// const gradientStyle = {
//   backgroundImage: `conic-gradient(#FF0066 0deg, #6A0DAD ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`, // Pink -> Purple gradient -> Gray
//   borderRadius: "50%", // Ensure it's a circle
// };

const WrongAnswersList = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border rounded-lg p-2 overflow-y-auto bg-white shadow-sm w-full">
      <div
        className="flex justify-between items-center overflow-y-auto  scrollbar-hide mb-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold">{title}</h4>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul
          className=" overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 max-h-20"
        >
          {items.map((item, index) => (
            <li key={index} className="text-sm border-t pt-1 pb-1">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function GameInsight() {
  // Restored old inline styles definitions

  return (
    // Overall container
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
            Game Insight
          </h1>
          {/* Game Insight Sections Wrapper */}
          <div className="space-y-8">
            {/* Wrapper for Spelling Bee and Phonics Game */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Spelling Bee Section */}
              <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Spelling Bee</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Level 1 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 1</h3>
                    <PieChart percentage={0} />
                    <WrongAnswersList
                      title="Wrong words"
                      items={["Hi", "An", "Is"]}
                    />
                  </div>
                  {/* Level 2 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 2</h3>
                    <PieChart percentage={54} />
                    <WrongAnswersList
                      title="Wrong words"
                      items={["Apple", "Ant", "Here"]}
                    />
                  </div>
                  {/* Level 3 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 3</h3>
                    <PieChart percentage={39} />
                    <WrongAnswersList
                      title="Wrong words"
                      items={[
                        "Banana",
                        "Butterfly",
                        "Crocodile",
                        "Banana",
                        "Butterfly",
                        "Crocodile",
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* Phonics Game Section */}
              <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Phonics Game</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {" "}
                  {/* Adjusted to 2 columns */}
                  {/* Level 1 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 1</h3>
                    <PieChart percentage={77} />
                    <WrongAnswersList
                      title="Wrong Answers"
                      items={["A", "C", "X"]}
                    />
                  </div>
                  {/* Level 2 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 2</h3>
                    <PieChart percentage={54} />
                    <WrongAnswersList
                      title="Wrong Answers"
                      items={["CH", "Ai", "OU"]}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* {renderContent()} */}
        </main>
      </div>
    </div>
  );
}
