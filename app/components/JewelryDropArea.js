"use client";

import { useDroppable } from "@dnd-kit/core";

const JewelryDropArea = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-green-500">
      {props.children}
    </div>
  );
};

export default JewelryDropArea;
