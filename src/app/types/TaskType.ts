export type TASK_TYPE = 'TODO' | 'INPROGRESS' | 'DONE';

type Task = {
  id: string;
  title: string;
  description: string;
  status: TASK_TYPE;
}

export default Task;
