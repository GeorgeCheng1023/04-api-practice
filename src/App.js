import React, { useEffect, useState } from 'react';
import useRequest from './hooks/useRequest'
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

 

  const {isLoading, error, sendRequest: fetchTasks} = useRequest()


  useEffect(() => {
    const transformTasks = (data) => {
      const loadedTasks = [];
  
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }
    fetchTasks(
      {url: 'https://practice-84ea8-default-rtdb.firebaseio.com/'},
      transformTasks
      );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
