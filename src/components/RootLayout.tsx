import { Box, Flex, Heading } from '@radix-ui/themes';
import { CreateTask } from './CreateTaskForm/createTask';
import TaskBoard from './TaskBoard/TaskBoard';

const RootLayout: React.FC = () => {
  return (
    <Box maxWidth="100%" mx="auto">
      <Box height="4rem" px="4">
        <Flex align="center" gap="4" height="100%">
          <Heading>Kanban List</Heading>
          <CreateTask />
        </Flex>
      </Box>

      <Box px="4" maxWidth="100%" mx="auto">
        <h2 className="mb-3">Task Board</h2>
        <TaskBoard />
      </Box>
    </Box>
  );
};

export default RootLayout;
