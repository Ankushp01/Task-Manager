import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

function TaskForm() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const id = Date.now();

    const add = () => {
        if (!input.trim()) return;
        dispatch(addTask({ id, text: input, status: false }));
        setInput('');
    };

    return (
        <div className="w-full flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-purple-500">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">Task-on</h1>
            <h3 className="text-lg text-gray-400 mb-4">Welcome to your personal Task Manager</h3>
            <input
                className="w-full p-3 text-lg rounded-lg border-2 border-purple-400 bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your task..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
            <button
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 text-xl"
                onClick={add}
            >
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;
