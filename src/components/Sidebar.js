"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaHistory,
  FaGamepad,
  FaCalendarAlt,
  FaBook,
  FaQuestionCircle,
  FaChevronRight,
} from "react-icons/fa";

// Helper function to merge class names (optional, but good practice)
// You might need to install clsx: npm install clsx
// import clsx from 'clsx';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // Pre-calculate sidebarLinks to avoid dependency warning if defined inside useEffect
    const links = [
      { text: "Home", icon: FaHome, href: "/dashboard" },
      { text: "Activity Log", icon: FaHistory, href: "/ActivityLog" },
      { text: "Game Insight", icon: FaGamepad, href: "/GameInsight" },
      { text: "Planner Insight", icon: FaCalendarAlt, href: "/PlannerInsight" },
      { text: "Resources", icon: FaBook, href: "/Resources" },
      { text: "Help", icon: FaQuestionCircle, href: "/Help" },
    ];
    const currentPathIndex = links.findIndex((link) => link.href === pathname);
    setActiveIndex(currentPathIndex);
  }, [pathname]); // Depend only on pathname

  // Moved sidebarLinks definition outside useEffect but inside component scope
  const sidebarLinks = [
    { text: "Home", icon: FaHome, href: "/dashboard" },
    { text: "Activity Log", icon: FaHistory, href: "/ActivityLog" },
    { text: "Game Insight", icon: FaGamepad, href: "/GameInsight" },
    { text: "Planner Insight", icon: FaCalendarAlt, href: "/PlannerInsight" },
    { text: "Resources", icon: FaBook, href: "/Resources" },
    { text: "Help", icon: FaQuestionCircle, href: "/Help" },
  ];

  const onLinkClick = (index) => {
    const href = sidebarLinks[index].href;
    if (href && href !== pathname) {
      router.push(href);
    } else if (href === pathname) {
      console.log("Already on page:", href);
    } else {
      console.error("No href defined for index:", index);
    }
  };

  // --- JSX with Tailwind ---
  return (
    <aside className="w-60 bg-[#EDF6F7] text-[#5D3587]  flex flex-col flex-shrink-0 h-screen shadow-lg font-sans sticky top-0">
      {" "}
      {/* Use sticky and h-screen */}
      <h2 className="bg-white shadow-md text-black text-center font-bold text-xl md:text-2xl py-4">
        DyslexiAid
      </h2>
      <div className="mt-4 mb-4 px-4">
        {" "}
        {/* Add some space at the top & padding */}
        {/* Logo or placeholder could go here */}
        {/* <img src="/path/to/logo.png" alt="Logo" className="h-10 w-auto" /> */}
        {/* <h2 className="bg-white  text-black text-center font-bold text-xl md:text-2xl py-4">
          DyslexiAid
        </h2> */}
      </div>
      <nav className="flex-grow px-2">
        {" "}
        {/* Use nav tag, added padding */}
        <ul>
          {" "}
          {/* Removed inline listStyle */}
          {sidebarLinks.map((link, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={index}
                className={`
                  mb-2 rounded-lg transition-colors duration-200 ease-in-out group cursor-pointer
                  ${
                    isActive
                      ? "bg-[#5D3587] text-white shadow-inner"
                      : "hover:bg-purple-100 hover:text-[#A367B1]"
                  }
                `}
                onClick={() => onLinkClick(index)}
              >
                <a
                  href={link.href}
                  onClick={(e) => e.preventDefault()} // Still prevent default as li handles click
                  className={`
                    flex items-center justify-between w-full p-3 rounded-lg 
                    text-sm /* Adjusted text size */
                  `}
                >
                  <div className="flex items-center">
                    <link.icon
                      className={`
                      mr-3 text-base /* Adjusted icon size */
                      ${isActive ? "text-white" : "text-[#5D3587] group-hover:text-[#A367B1]"} 
                      transition-colors duration-200 ease-in-out
                    `}
                    />
                    <span
                      className={`flex-grow ${isActive ? "font-semibold" : "font-medium"}`}
                    >
                      {" "}
                      {/* Adjusted font weight */}
                      {link.text}
                    </span>
                  </div>
                  <FaChevronRight
                    className={`
                    text-xs ml-auto 
                    ${isActive ? "text-white" : "text-[#A367B1] opacity-0 group-hover:opacity-100"} /* Hide arrow unless active or hovered */
                    transition-opacity duration-200 ease-in-out
                  `}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Optional: Add User Profile/Logout at the bottom */}
      {/* <div className="mt-auto p-4 border-t border-gray-300"> ... </div> */}
    </aside>
  );
};

export default Sidebar;
