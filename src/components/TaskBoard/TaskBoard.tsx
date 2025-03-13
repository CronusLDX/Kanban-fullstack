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
            To do ({task.filter(t => t.status === 'todo').length})
          </Badge>
          {task
            .filter(t => t.status === 'todo')
            .map(tasks =>
              tasks.status === 'todo' ? (
                <TaskCard tasks={tasks} key={tasks.id} />
              ) : (
                ''
              )
            )}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow" variant="soft">
            Work in Progress ({task.filter(t => t.status === 'doing').length})
          </Badge>
          {task
            .filter(t => t.status === 'doing')
            .map(tasks =>
              tasks.status === 'doing' ? (
                <TaskCard tasks={tasks} key={tasks.id} />
              ) : (
                ''
              )
            )}
        </Flex>
        <Flex direction="column" gap="4">
          <Badge size="3" color="green" variant="soft">
            Accomplished ({task.filter(t => t.status === 'done').length})
          </Badge>
          {task
            .filter(t => t.status === 'done')
            .map(tasks =>
              tasks.status === 'done' ? (
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
