import { Badge, Button, Card, Flex, Text } from '@radix-ui/themes';
import { TaskInfo, TaskStatus } from '../../interfaces/interface';
import { useTask } from '../../contexts/TaskContext';

const TaskCard: React.FC<{ tasks: TaskInfo }> = ({ tasks }) => {
  const { updateTask, deleteTask } = useTask();

  const getPriorityColor = (priority: string) => {
    const priorityColors: { [key: string]: 'blue' | 'yellow' | 'tomato' } = {
      low: 'blue',
      medium: 'yellow',
      high: 'tomato',
    };
    return priorityColors[priority];
  };

  const getActionTextsColors = (status: string) => {
    const actionTextsColors: { [key: string]: 'blue' | 'yellow' } = {
      todo: 'blue',
      doing: 'yellow',
    };

    return actionTextsColors[status];
  };

  const getActionTexts = (text: TaskStatus) => {
    const actionTexts = {
      todo: 'Begin',
      doing: 'Conclude',
      done: '',
    };
    return actionTexts[text];
  };

  const HandleDelete = (): void => {
    if (tasks.id) {
      deleteTask(tasks.id);
    }
  };

  const HandleStatus = (): void => {
    if (tasks.id) {
      updateTask(tasks.id);
    }
  };

  return (
    <Card>
      <Flex gap="4" direction="column" content="center" align="start">
        <Flex gap="2" align="center">
          <Text weight="bold">{tasks.title}</Text>
          <Badge
            color={getPriorityColor(tasks.priority)}
            variant="soft"
            size="2"
          >
            {tasks.priority}
          </Badge>
        </Flex>
        <Text as="p" my="3">
          {tasks.description}
        </Text>
        <Flex gap="2">
          {tasks.status !== 'done' && (
            <Button
              variant="soft"
              color={getActionTextsColors(tasks.status)}
              onClick={HandleStatus}
            >
              {getActionTexts(tasks.status)}
            </Button>
          )}

          <Button variant="soft" color="red" onClick={HandleDelete}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TaskCard;
