import { useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { TaskInfo } from '../../interfaces/interface';
import { useTask } from '../../contexts/TaskContext';

export const CreateTask: React.FC = () => {
  const { createTask } = useTask();
  const [formData, setForm] = useState<TaskInfo>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'low',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRadioChange = (name: keyof TaskInfo, value: string): void => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    createTask(formData);
    console.log();

    setForm({
      title: '',
      description: '',
      status: 'todo',
      priority: 'low',
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> New Task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>New Task</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add new task to the board
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Box maxWidth="30rem">
              <Box mb="2">
                <Text as="label" htmlFor="title">
                  Title
                </Text>
                <TextField.Root
                  placeholder="Place the title here"
                  name="title"
                  id="title"
                  autoFocus
                  required
                  mt="2"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Box>

              <Box mb="2" mt="4">
                <Text as="label" htmlFor="description">
                  Description
                </Text>
                <TextArea
                  placeholder="Describe the task"
                  name="description"
                  id="description"
                  mt="2"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </Box>

              <Flex gap="8" mt="6" mb="4">
                <Box>
                  <Text>Status</Text>
                  <RadioGroup.Root
                    value={formData.status}
                    onValueChange={value => handleRadioChange('status', value)}
                  >
                    <Flex direction="column" gap="2">
                      <RadioGroup.Item value="todo">
                        <Badge color="blue">To Do</Badge>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="doing">
                        <Badge color="orange">Doing</Badge>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="done">
                        <Badge color="green">Done</Badge>
                      </RadioGroup.Item>
                    </Flex>
                  </RadioGroup.Root>
                </Box>

                <Box>
                  <Text>Priority</Text>
                  <RadioGroup.Root
                    value={formData.priority}
                    onValueChange={value =>
                      handleRadioChange('priority', value)
                    }
                  >
                    <Flex direction="column" gap="2">
                      <RadioGroup.Item value="low">
                        <Badge color="blue">Low</Badge>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="medium">
                        <Badge color="yellow">Medium</Badge>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="high">
                        <Badge color="tomato">High</Badge>
                      </RadioGroup.Item>
                    </Flex>
                  </RadioGroup.Root>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="4" mt="4">
            <Dialog.Close>
              <Button color="red" variant="soft">
                Cancel
              </Button>
            </Dialog.Close>

            <Button color="green" type="submit" variant="soft">
              Create Task
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
