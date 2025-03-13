import { RouterProvider } from 'react-router';
import router from './Routes';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}

export default App;
