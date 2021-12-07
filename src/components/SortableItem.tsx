import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Item = (props: any) => {
  const { id } = props;

  const style = {
    display: "block",
    border: "2px solid black",
    borderRadius: ".5rem",
    padding: "4px",
    marginRight: "10px",
  };
  return <div style={style}>{id}</div>;
};
export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.value });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.value} />
    </div>
  );
}
