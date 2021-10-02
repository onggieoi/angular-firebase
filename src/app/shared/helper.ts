import { FormControl } from "@angular/forms";

import Task from "../types/TaskType";

export const errorMessageHandler = (formField: FormControl, fieldName: string) => {
  if (formField.errors?.required) return `${fieldName} is required`;
  if (formField.errors?.email) return `${fieldName} is invalid email format`;

  return `${fieldName} is Invaild`;
};

export const taskFilter = (tasks: Task[]) => {
  const todoTasks: Task[] = [];
  const inprogressTask: Task[] = [];
  const doneTasks: Task[] = [];

  tasks.map(task => {
    switch (task.status) {
      case 'TODO':
        todoTasks.push(task);
        break;

      case 'INPROGRESS':
        inprogressTask.push(task);
        break;

      case 'DONE':
        doneTasks.push(task);
        break;

      default:
        break;
    }
  });

  return {
    todoTasks,
    inprogressTask,
    doneTasks,
  }
};

export const userFormat = ({ name, role }: UserForm) => {
  return {
    name,
    role,
    email: `${name.replace(/\s+/g, '').toLowerCase()}@gmail.com`,
    password: '123456'
  }
}

type UserForm = {
  name: string;
  role: string;
}
