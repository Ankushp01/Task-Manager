import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { markCompleted, removeTask, updateTaskOrder } from "../store/taskSlice";
import { Close } from "@mui/icons-material";
import { Input } from "@mui/material";

function TaskList() {
    const [sort, setSort] = useState("all");
    const taskList = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);
        dispatch(updateTaskOrder(updatedTasks));
    };

    const remove = (id) => {
        dispatch(removeTask(id));
    };

    const filteredTasks = () => {
        if (sort === "completed") return taskList.filter((task) => task.status);
        if (sort === "date") return [...taskList].sort((a, b) => a.id - b.id);
        return taskList;
    };

    return (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-black rounded-xl shadow-lg border border-purple-500">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Your Tasks</h2>

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-purple-700 text-white p-2 rounded-lg mb-4"
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="date">Date</option>
            </select>

            {taskList.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <ul
                                className="space-y-3"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredTasks().map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <li
                                                className="p-3 bg-purple-600 text-white rounded-lg shadow-md flex justify-between items-center hover:bg-purple-500 transition duration-300"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Input
                                                    type="checkbox"
                                                    checked={task.status}
                                                    onChange={() => dispatch(markCompleted(task.id))}
                                                />
                                                <p
                                                    className={`text-white transition-all duration-300 text-xl ${task.status
                                                        ? "line-through decoration-2 decoration-black opacity-60"
                                                        : "opacity-100"
                                                        }`}
                                                >
                                                    {task.text}
                                                </p>
                                                <button
                                                    className="ml-4 px-2 py-1 bg-black text-white rounded hover:bg-red-500"
                                                    onClick={() => remove(task.id)}
                                                >
                                                    <Close fontSize="small" />
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <p className="text-gray-400 text-center">No tasks available</p>
            )}
        </div>
    );
}

export default TaskList;
