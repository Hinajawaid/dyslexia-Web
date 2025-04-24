"use client";

import { useState } from "react";

export default function AdminPage() {
  const [number, setNumber] = useState(0); // Number of input pairs to create
  const [level, setLevel] = useState(0); // Level input
  const [words, setWords] = useState([]); // To store words from input fields
  const [audios, setAudios] = useState([]); // To store audio files from input fields

  // Dynamically update the words array
  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  // Dynamically update the audios array
  const handleAudioChange = (index, files) => {
    const newAudios = [...audios];
    newAudios[index] = files[0]; // Only taking the first file for simplicity
    setAudios(newAudios);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a FormData object for sending files
      const formData = new FormData();
      formData.append("level", level);

      // Append words and audio files
      words.forEach((word, index) => {
        formData.append(`words[${index}]`, word);
        formData.append(`audios[${index}]`, audios[index]);
      });

      // API call to the backend
      const response = await fetch("http://10.113.87.207:5000/spelling/save", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Dynamic Input Fields</h1>
      {/* Form Starts */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Number of Inputs */}
        <div className="mb-4">
          <label htmlFor="number" className="block font-medium mb-1">
            Number of Inputs
          </label>
          <input
            type="number"
            id="number"
            min="0"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Level Input */}
        <div className="mb-4">
          <label htmlFor="level" className="block font-medium mb-1">
            Level
          </label>
          <input
            type="number"
            id="level"
            min="0"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic Inputs */}
        <div className="mt-6">
          {[...Array(number)].map((_, i) => (
            <div key={i} className="mb-4">
              {/* Word Input */}
              <label htmlFor={`word-${i}`} className="block font-medium mb-1">
                Word {i + 1}
              </label>
              <input
                type="text"
                id={`word-${i}`}
                onChange={(e) => handleWordChange(i, e.target.value)}
                placeholder={`Enter word ${i + 1}`}
                className="mb-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {/* Audio Input */}
              <label htmlFor={`audio-${i}`} className="block font-medium mb-1">
                Audio {i + 1}
              </label>
              <input
                type="file"
                id={`audio-${i}`}
                onChange={(e) => handleAudioChange(i, e.target.files)}
                className="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
