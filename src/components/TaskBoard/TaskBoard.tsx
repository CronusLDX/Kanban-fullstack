import { Badge, Flex, Grid, ScrollArea } from '@radix-ui/themes';
import TaskCard from '../TaskCard/TaskCard';
import { useTask } from '../../contexts/TaskContext';

const TaskBoard: React.FC = () => {
  const { task } = useTask();

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns="3" gap="4" minWidth="60rem">
        <Flex direction="column" gap="4">
          <Badge size="3" color="blue" variant="soft">
            To do ({task.filter(t => t.status === 'Todo').length})
          </Badge>
          {task
            .filter(t => t.status === 'Todo')
            .map(tasks =>
              tasks.status === 'Todo' ? (
                <TaskCard tasks={tasks} key={tasks.id} />
              ) : (
                ''
              )
            )}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow" variant="soft">
            Work in Progress ({task.filter(t => t.status === 'Doing').length})
          </Badge>
          {task
            .filter(t => t.status === 'Doing')
            .map(tasks =>
              tasks.status === 'Doing' ? (
                <TaskCard tasks={tasks} key={tasks.id} />
              ) : (
                ''
              )
            )}
        </Flex>
        <Flex direction="column" gap="4">
          <Badge size="3" color="green" variant="soft">
            Accomplished ({task.filter(t => t.status === 'Done').length})
          </Badge>
          {task
            .filter(t => t.status === 'Done')
            .map(tasks =>
              tasks.status === 'Done' ? (
                <TaskCard tasks={tasks} key={tasks.id} />
              ) : (
                ''
              )
            )}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};

export default TaskBoard;
