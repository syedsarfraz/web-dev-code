import { signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const todos = signal<Todo[]>([]);
