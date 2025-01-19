"use client";

import { useDraggable } from "@dnd-kit/core";

const JewelryItem = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-blue-500"
    >
      {props.children}
    </button>
  );
};

export default JewelryItem;
