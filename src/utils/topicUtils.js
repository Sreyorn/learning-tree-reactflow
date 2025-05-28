export const getProgress = (topic) => {
  let total = 1,
    completed = topic.status === "Completed" ? 1 : 0;
  topic.subtopics.forEach((sub) => {
    const subProgress = getProgress(sub);
    total += subProgress.total;
    completed += subProgress.completed;
  });
  return { total, completed };
};

export const buildNodes = (
  topic,
  parentId = null,
  level = 0,
  position = { x: 0, y: 0 },
  nodes = [],
  edges = [],
  //   positionsMap = {},
  selectedNode = null,
  prevNodes = []
) => {
  const nodeId = topic._id;
  const isSelected = nodeId === selectedNode;
  const prevNode = prevNodes.find((n) => n.id === nodeId);
  //   use previous node position if available, otherwise use current position
  const nodePosition = prevNode ? prevNode.position : position;
  const color =
    topic.status === "Completed"
      ? "#f902"
      : topic.status === "In Progress"
      ? "#ff99"
      : "#ffee";

  const { completed, total } = getProgress(topic);
  const percent = Math.round((completed / total) * 100);
  //   const pos = positionsMap[nodeId] || position || { x: 0, y: 0 };
  nodes.push({
    id: nodeId,
    data: { label: `${topic.title} (${topic.status})` },
    position: nodePosition,
    style: {
      backgroundColor: color,
      padding: 10,
      borderRadius: 8,
      border: isSelected ? "2px solid #2563eb" : "1px dotted #333",
      boxShadow: isSelected ? "0 0 10px #fe01" : undefined,
      zIndex: isSelected ? 10 : 1,
    },
  });
  if (parentId) {
    edges.push({
      id: `${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
    });
  }

  // for children: if they existed before, use their previous positions
  // for new children, calculate positions based on parent
  let offsetX = (-150 * (topic.subtopics.length - 1)) / 2;
  topic.subtopics.forEach((sub, index) => {
    const childPrevNode = prevNodes.find((n) => n.id === sub._id);
    const childPos = childPrevNode
      ? childPrevNode.position
      : {
          x: nodePosition.x + offsetX + index * 150,
          y: nodePosition.y + 150,
        };
    buildNodes(
      sub,
      nodeId,
      level + 1,
      childPos,
      nodes,
      edges,
      selectedNode,
      prevNodes
    );
  });
  return { nodes, edges };
};
