import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        markCompleted: (state, action) => {
            const task = state.find(task => task.id === action.payload);
            if (task) task.status = !task.status;
        },
        updateTaskOrder: (state, action) => {
            return action.payload; // Replace state with new ordered list
        }
    }
})

export const { addTask, removeTask, markCompleted, updateTaskOrder } = taskSlice.actions;

export default taskSlice.reducer;