import { useLearning } from "@/context/LearningContext";
import { buildNodes } from "@/utils/topicUtils";
import { applyNodeChanges } from "@xyflow/react";

export default function useTopicActions({
  newTitle,
  setNewTitle,
  editTitle,
  setEditTitle,
  newStatus,
}) {
  const { topics, setTopics, setElements, selectedNode, setSelectedNode } =
    useLearning();

  const saveToLocal = (data) => {
    localStorage.setItem("learningTree", JSON.stringify(data));
  };
  // Helper to update topics and elements, preserving node positions
  const updateTree = (updatedTopics, selectedNodeAfter = selectedNode) => {
    setTopics(updatedTopics);
    saveToLocal(updatedTopics[0]);
    setElements((prev) => {
      const { nodes, edges } = buildNodes(
        updatedTopics[0],
        null,
        0,
        { x: 0, y: 0 },
        [],
        [],
        selectedNodeAfter,
        prev.nodes
      );
      return { nodes, edges };
    });
  };

  const handleAddSubtopic = () => {
    if (selectedNode && newTitle.trim()) {
      const addToTopic = (topic) => {
        if (topic._id === selectedNode) {
          topic.subtopics.push({
            _id: Date.now().toString(),
            title: newTitle,
            status: "Not Started",
            subtopics: [],
          });
        } else {
          topic.subtopics.forEach(addToTopic);
        }
      };
      const updatedTopics = [...topics];
      addToTopic(updatedTopics[0]);
      setTopics(updatedTopics);
      saveToLocal(updatedTopics[0]);
      updateTree(updatedTopics);
      setNewTitle("");
    }
  };

  const handleStatusChange = () => {
    if (selectedNode) {
      const updateStatusInTopic = (topic) => {
        if (topic._id === selectedNode) {
          topic.status = newStatus;
        } else {
          topic.subtopics.forEach(updateStatusInTopic);
        }
      };
      const updatedTopics = [...topics];
      updateStatusInTopic(updatedTopics[0]);
      setTopics(updatedTopics);
      saveToLocal(updatedTopics[0]);
      updateTree(updatedTopics);
    }
  };

  const handleEditTitle = () => {
    const editTitleInTopic = (topic) => {
      if (topic._id === selectedNode) {
        topic.title = editTitle;
      } else {
        topic.subtopics.forEach(editTitleInTopic);
      }
    };
    const updatedTopics = [...topics];
    editTitleInTopic(updatedTopics[0]);
    setTopics(updatedTopics);
    saveToLocal(updatedTopics[0]);
    updateTree(updatedTopics);
    setEditTitle("");
  };

  const handleDeleteNode = () => {
    const removeById = (topic, id) => {
      topic.subtopics = topic.subtopics.filter((sub) => sub._id !== id);
      topic.subtopics.forEach((sub) => removeById(sub, id));
    };
    const updatedTopics = [...topics];
    removeById(updatedTopics[0], selectedNode);
    setTopics(updatedTopics);
    saveToLocal(updatedTopics[0]);
    updateTree(updatedTopics, null);
    setSelectedNode(null);
  };

  const handleNodesChange = (changes) => {
    setElements((prev) => ({
      ...prev,
      nodes: applyNodeChanges(changes, prev.nodes),
    }));
  };

  return {
    handleAddSubtopic,
    handleStatusChange,
    handleEditTitle,
    handleDeleteNode,
    handleNodesChange,
  };
}
