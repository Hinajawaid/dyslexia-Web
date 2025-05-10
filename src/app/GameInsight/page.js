"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Planner from "../../components/Planner";

// Placeholder imports - replace with your actual components
const PieChart = ({ correctWordsArr = [], totalQuestions = 1 }) => {
  console.log("correctWordsArr", correctWordsArr);
  console.log("totalQuestions", totalQuestions);
  if (correctWordsArr[0] == "") {
    correctWordsArr = [];
  }
  // Avoid division by zero
  const percentage =
    totalQuestions > 0
      ? Math.round((correctWordsArr.length / totalQuestions) * 100)
      : 0;
  console.log("length", correctWordsArr.length, percentage);
  const gradientStyle = {
    backgroundImage: `conic-gradient(#FF0066 0deg, #6A0DAD ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`,
    borderRadius: "50%",
  };

  return (
    <div
      className="w-32 h-32 rounded-full flex items-center justify-center relative"
      style={gradientStyle}
    >
      {/* Donut hole */}
      <div className="absolute w-[85%] h-[85%] bg-[#EDF6F7] rounded-full flex items-center justify-center">
        <span className="text-lg font-semibold">{percentage}%</span>
      </div>
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
  const [gameData, setGameData] = useState(null);
  const [level1Data, setLevel1Data] = useState(null);
  const [level2Data, setLevel2Data] = useState(null);
  const [level3Data, setLevel3Data] = useState(null);
  const [phonicsGameData, setPhonicsGameData] = useState(null);
  const [level1PhonicsData, setLevel1PhonicsData] = useState(null);
  const [level2PhonicsData, setLevel2PhonicsData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Restored old inline styles definitions

  useEffect(() => {
    const fetchGameData = async () => {
      console.log("Fetching game data...");
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.1.75:4000/game/getGamebyId",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Game Data:", response.data.data);
        setGameData(response.data.data); // Save the data for rendering

        const level1 = response.data.data.find((item) => item.level === 1);
        const level2 = response.data.data.find((item) => item.level === 2);
        const level3 = response.data.data.find((item) => item.level === 3);

        console.log("Level 1 Data:", level1);
        console.log("Level 2 Data:", level2);
        console.log("Level 3 Data:", level3);

        setLevel1Data(level1);
        setLevel2Data(level2);
        setLevel3Data(level3);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };

    const setLevelData = async () => {
      const level1 = gameData.find((item) => item.level === 1);
      const level2 = gameData.find((item) => item.level === 2);
      const level3 = gameData.find((item) => item.level === 3);

      console.log("Level 1 Data:", level1);
      console.log("Level 2 Data:", level2);
      console.log("Level 3 Data:", level3);

      setLevel1Data(level1);
      setLevel2Data(level2);
      setLevel3Data(level3);
    };
    const fetchPhonicsGameData = async () => {
      console.log("Fetching phonics game data...");
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.1.75:4000/phonicsGame/getPhonicsGamebyId",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("phonics Game Data:", response.data.data);
        setPhonicsGameData(response.data.data); // Save the data for rendering

        const level1 = response.data.data.find((item) => item.level === 1);
        const level2 = response.data.data.find((item) => item.level === 2);

        console.log(" phonics Level 1 Data:", level1);
        console.log(" phonics Level 2 Data:", level2);

        setLevel1PhonicsData(level1);
        setLevel2PhonicsData(level2);
      } catch (error) {
        console.error("Error fetching phonics game data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
    fetchPhonicsGameData();
    // setLevelData();
  }, []);

  // useEffect(() => {
  //   if (gameData && Array.isArray(gameData)) {
  //     const level1 = gameData.find((item) => item.level === 1);
  //     const level2 = gameData.find((item) => item.level === 2);
  //     const level3 = gameData.find((item) => item.level === 3);

  //     console.log("Level 1 Data:", level1);
  //     console.log("Level 2 Data:", level2);
  //     console.log("Level 3 Data:", level3);

  //     setLevel1Data(level1);
  //     setLevel2Data(level2);
  //     setLevel3Data(level3);
  //   }
  // }, [gameData]);

  // Don't render the UI until the data is fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>{" "}
        {/* Add your own spinner or loading component */}
      </div>
    );
  }

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
                    <PieChart
                      correctWordsArr={level1Data?.correctWordsArr || []}
                      totalQuestions={level1Data?.totalQuestion || 0}
                    />{" "}
                    <WrongAnswersList
                      title="Wrong words"
                      items={level1Data?.wrongWordsArr || []}
                    />
                  </div>
                  {/* Level 2 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 2</h3>
                    <PieChart
                      correctWordsArr={level2Data?.correctWordsArr || []}
                      totalQuestions={level2Data?.totalQuestion || 0}
                    />{" "}
                    <WrongAnswersList
                      title="Wrong words"
                      items={level2Data?.wrongWordsArr || []}
                    />
                  </div>
                  {/* Level 3 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 3</h3>
                    <PieChart
                      correctWordsArr={level3Data?.correctWordsArr || []}
                      totalQuestions={level3Data?.totalQuestion || 0}
                    />{" "}
                    <WrongAnswersList
                      title="Wrong words"
                      items={level3Data?.wrongWordsArr || []}
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
                    <PieChart
                      correctWordsArr={level1PhonicsData?.correctWordsArr || []}
                      totalQuestions={level1PhonicsData?.totalQuestion || 0}
                    />
                    <WrongAnswersList
                      title="Wrong Answers"
                      items={level1PhonicsData?.wrongWordsArr || []}
                    />
                  </div>
                  {/* Level 2 */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium mb-2">Level 2</h3>
                    <PieChart
                      correctWordsArr={level2PhonicsData?.correctWordsArr || []}
                      totalQuestions={level2PhonicsData?.totalQuestion || 0}
                    />
                    <WrongAnswersList
                      title="Wrong Answers"
                      items={level2PhonicsData?.wrongWordsArr || []}
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
