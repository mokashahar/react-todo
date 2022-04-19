import { useState } from 'react';

function useStorage() {
  const [tasks, setTasks] = useState([]);

  const putTasks = items => {
    setTasks(items);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return [tasks, putTasks, clearTasks];
}

export default useStorage;
