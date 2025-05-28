"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProgress, buildNodes } from "@/utils/topicUtils";

// Dummy topic tree
const dummyData = {
  _id: "1",
  title: "My Learning Journey",
  status: "In Progress",
  subtopics: [
    {
      _id: "2",
      title: "Web Development",
      status: "Completed",
      subtopics: [
        {
          _id: "3",
          title: "Frontend",
          status: "Completed",
          subtopics: [
            {
              _id: "4",
              title: "React",
              status: "In Progress",
              subtopics: [],
            },
          ],
        },
        {
          _id: "5",
          title: "Backend",
          status: "Not Started",
          subtopics: [],
        },
      ],
    },
    {
      _id: "6",
      title: "Data Science",
      status: "In Progress",
      subtopics: [],
    },
    {
      _id: "7",
      title: "Mobile Development",
      status: "Not Started",
      subtopics: [],
    },
  ],
};
const LearningContext = createContext();
export function LearningProvider({ children }) {
  const [topics, setTopics] = useState([]);
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("learningTree");
    let data;
    if (saved) {
      data = JSON.parse(saved);
    } else {
      data = dummyData;
    }
    setTopics([data]);
    const { nodes, edges } = buildNodes(data);
    setElements({ nodes, edges });
  }, []);

  return (
    <LearningContext.Provider
      value={{
        topics,
        setTopics,
        elements,
        setElements,
        selectedNode,
        setSelectedNode,
        mounted,
        setMounted,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}
