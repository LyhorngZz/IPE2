import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getAllTasks() {
    return [
      {
        name: 'Task 1',
        description: 'Description of Task 1',
        createdAt: new Date().toISOString(),
        completedAt: null,
        userId: 1,
      },
      {
        name: 'Task 2',
        description: 'Description of Task 2',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        userId: 1,
      },
      {
        name: 'Task 3',
        description: 'Description of Task 3',
        createdAt: new Date().toISOString(),
        completedAt: null,
        userId: 1,
      }
    ];
  }
  getTask(id: string) {
    console.log(id);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  createTask(body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  updateTask(id: string, body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  deleteTask(id: string) {
    console.log(id);
    return { message: 'success' };
  }
}
