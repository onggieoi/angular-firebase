export type TASK_TYPE = 'TODO' | 'INPROGRESS' | 'DONE';

type Task = {
  id: string | number;
  title: string;
  description: string;
  status: TASK_TYPE;
}

export default Task;
