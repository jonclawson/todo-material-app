import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() { }

  list(): Task[] {
    const storage = window.localStorage.getItem('todo-items');
    if (storage) {
      this.tasks = JSON.parse(storage);
    }
    return this.tasks;
  }

  create(task: Task): void {
    task.id = this.tasks.length + 1;
    task.active = true;
    this.tasks.push(task);
    this.setStorage();
  }

  read(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  update(updates: Task): void {
    const task = this.read(updates.id);
    if (task) {
      Object.assign(task, updates);
    }
    this.setStorage();
  }

  delete(id: number): void {
    const task = this.read(id);
    if (task) {
      task.active = false;
      this.setStorage();
    }
  }

  private setStorage(): void {
    window.localStorage.setItem('todo-items', JSON.stringify(this.tasks));
  }
}
