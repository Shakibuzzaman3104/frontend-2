import { Draggable } from "@hello-pangea/dnd";
import classnames from "classnames";
import React, { useMemo } from "react";

const MovieCard = React.memo(({ id, name, review, index, onEdit, columnId }) => {
  const cardClasses = useMemo(() => {
    return classnames(
      "flex items-center justify-between w-full p-4 rounded gap-x-2",
      columnId === 0 ? "bg-gray-200" : columnId === 1 ? "bg-purple-600" : "bg-gray-400"
    );
  }, [columnId]);


  return (
    <Draggable draggableId={id.toString()} key={id.toString()} index={index}>
      {(provided) => (
        <div
          className={cardClasses}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={classnames("flex flex-col overflow-hidden", columnId === 1 ? "text-white" : "text-black")}>
            <h2 className="text-base font-semibold mb-2 truncate">Name: {name}</h2>
            <p className="text-sm font-medium truncate">Review: {review}</p>
          </div>
          <div>
            <button type="button" onClick={onEdit} className="bg-black rounded text-sm text-white px-3 py-1">
              Edit
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
});


MovieCard.displayName = "MovieCard";

export default MovieCard;