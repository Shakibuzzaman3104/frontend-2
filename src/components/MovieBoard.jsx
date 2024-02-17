"use client";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import EditModel from "@/components/AddEditModel";
const MovieBoard = ({ data = [], onDragEnd, updateMovie }) => {
  const [isEditModelOpen, setEditModelOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    name: "",
    review: "",
    index: null
  });
  const handleEdit = (item, index) => {
    setEditedData({ ...item, index });
    setEditModelOpen(true);
  };
  const handleEditClose = () => {
    setEditModelOpen(false);
  };
  return (
    <div className="flex gap-4 justify-between mt-10 mx-4 flex-col lg:gap-x-32 md:flex-row">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.map((val, index) => {
          return (
            <div
              className={`rounded md:w-1/3 max-w-64 p-2 w-full ${
                val.id === 1
                  ? "bg-[#BDE3FF]"
                  : val.id === 2
                  ? "bg-[#14AE5C]"
                  : "bg-[#FCD19C]"
              }`}
              key={index}>
              <h2 className="text-center text-base font-medium mb-4 mt-1 text-black">
                {val.title}
              </h2>
              <Droppable droppableId={`droppable${index}`}>
                {(provided) => (
                  <div
                    className="px-2  h-[500px] scroll-bar overflow-y-auto space-y-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {val.items?.map((item, subIndex) => (
                      <MovieCard
                        columnId={val.id}
                        id={item.id}
                        name={item.name}
                        key={item.id}
                        review={item.review}
                        index={subIndex}
                        onEdit={(e) => handleEdit(item, index)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
      {isEditModelOpen && (
        <EditModel
          btnText="Update"
          isOpen={isEditModelOpen}
          onForm={updateMovie}
          onClose={handleEditClose}
          InitialValues={editedData}
        />
      )}
    </div>
  );
};

export default MovieBoard;
