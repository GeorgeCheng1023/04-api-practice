
import useRequest from '../../hooks/useRequest'
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest: sendTaskRequest} = useRequest()

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url:'https://practice-84ea8-default-rtdb.firebaseio.com/task.json',
        method: 'POST',
        body: JSON.stringify({ text: taskText }),
        headers: {
          'Content-Type': 'application/json',
        }
      },
      createTask.bind(null, taskText)
    )
    
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
