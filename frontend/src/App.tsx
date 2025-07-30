import { useState, useEffect } from 'react';
import axios from 'axios';
type Task = {
  id: number;
  text: string;
};


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { text }).then(res => {
      setTasks([...tasks, res.data]);
      setText('');
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Task Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1" onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id} className="border-b py-1">{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
