import { Injectable } from '@angular/core';
import { DayEstimation } from '../_models/estimation-state/estimation.days';
import { HourEstimation } from '../_models/estimation-state/estimation.hours';
import { Task } from '../_models/task';
import { Completed } from '../_models/task-state-state/task.state.completed';
import { InProgress } from '../_models/task-state-state/task.state.inprogress';
import { Planned } from '../_models/task-state-state/task.state.planned';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  tasks: Task [] = []

  constructor() { 
    this.tasks = [
      new Task(1, "Create app", "Create app in angular", new HourEstimation(2), new Completed() ),
      new Task(2, "Create navbar component", "Create component" , new HourEstimation(1), new Completed()),
      new Task(3, "Create login component", "Create component", new HourEstimation(2), new Completed()),
      new Task(4, "Implements login service", "Implement login service", new HourEstimation(4), new Completed()),
      new Task(5, "Implements Google login", "Use OAuth",  new DayEstimation(2), new Completed()),
      new Task(6, "Create component task list", "Task list must have pagination and a filter", new HourEstimation(3), new InProgress),
      new Task(8, "Implements task service", "It has to get filter of state", new HourEstimation(2), new Planned()),
      new Task(9, "Create dummy task", "", new HourEstimation(6), new InProgress()),
      new Task(10, "Implements task model", "A task must have a name, a description, an amount, a estimation type and a state", new HourEstimation(2), new Planned()),
      new Task(11, "Translate views", "Implement an i18n with translate service for make the  internalization of the site",  new DayEstimation(1), new InProgress),
      new Task(12, "Translate snackbar text", "Use the translate service to translate snackbar alert", new HourEstimation(3), new InProgress())
    ]
  }

  public getAllTask(): [Task [], number]{
    const allTask =  this.tasks;
    let hours = this.getHoursOf(allTask);

    return [allTask, hours];
  }

  public getPlannedTask(): [Task [], number]{
    const planedTask = this.tasks.filter(task => task.isPlanned());
    let hours = this.getHoursOf(planedTask);
    return [planedTask, hours];
  }

  public getClosedTask(): [Task [], number]{
    const closedTask =  this.tasks.filter(task => task.isCompleted());
    let hours = this.getHoursOf(closedTask);

    return [closedTask, hours];
  }

  public getInProgressTask(): [Task [], number]{
    const inProgressTask =  this.tasks.filter(task => task.isInProgress());
    let hours = this.getHoursOf(inProgressTask);

    return [inProgressTask, hours];
  }

  public getHoursOf (taskList){
    return taskList.map(task => task.getHours()).reduce(function(a, b)
    {
      return a + b;
    });
  }

  createOrUpdateTask(task: any): Task{

    if (task.id == 0){
      task.id = this.tasks.length + 1;
      this.tasks.push(task);
      return task;
    }
    else{
      let currentTask = this.getTakById(task.id)
      let index = this.tasks.indexOf(currentTask);
      this.tasks[index] = task;
      return task;
    }
  }

  close( idTask: number){
    var taskRes= this.getTakById(idTask);
    taskRes.close();
    
    let index = this.tasks.indexOf(taskRes);
    this.tasks[index] = taskRes;
    return taskRes;
  }

  getTakById(idTask: number): Task{
    var task = this.tasks.find((task) => task.id == idTask);

    if(task == null){
      throw new Error("The task doesn't exist");
    }
    return task;
  }

  changeTaskState(idTask: number) {
    var task = this.getTakById(idTask);
    task.changeState();

    let index = this.tasks.indexOf(task);
    this.tasks[index] = task;
    return task;
  }

  delete(idTask: number): Task[] {
    this.tasks = this.tasks.filter(task => task.id != idTask);
    return this.tasks;
  }
}