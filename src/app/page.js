"use client";
import { ReactFlow, MiniMap, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useEffect, useState } from "react";
import SidebarControls from "@/components/SidebarControls";
import { useLearning } from "@/context/LearningContext";
import useTopicActions from "@/hooks/useTopicAtions";

export default function Home() {
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [newStatus, setNewStatus] = useState("Not Started");

  useEffect(() => {
    setMounted(true);
  }, []);

  const { elements, selectedNode, setSelectedNode, mounted, setMounted } =
    useLearning();

  const {
    handleAddSubtopic,
    handleStatusChange,
    handleEditTitle,
    handleDeleteNode,
    handleNodesChange,
  } = useTopicActions({
    newTitle,
    setNewTitle,
    editTitle,
    setEditTitle,
    newStatus,
  });
  if (!mounted) return null;
  return (
    <div className="w-screen h-screen relative text-gray-800 bg-gray-400">
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        onNodesChange={handleNodesChange}
        onNodeClick={(event, node) => setSelectedNode(node.id)}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>

      <SidebarControls
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        handleAddSubtopic={handleAddSubtopic}
        selectedNode={selectedNode}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleEditTitle={handleEditTitle}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        handleStatusChange={handleStatusChange}
        handleDeleteNode={handleDeleteNode}
      />
      <div className="absolute bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Learning Tree</h2>
        <p className="text-sm text-gray-600">
          Click on a node to select it and use the sidebar controls to manage
          your learning topics.
        </p>
      </div>
    </div>
  );
}
