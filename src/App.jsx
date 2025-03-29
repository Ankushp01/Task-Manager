import React from 'react';
import store from './store/store.js';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl border-4 border-purple-500 rounded-2xl p-8 shadow-2xl bg-gray-1000">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
