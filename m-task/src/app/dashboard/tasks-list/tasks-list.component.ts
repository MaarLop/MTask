import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';

import { TranslateService } from '@ngx-translate/core';
import { CreateEditModalComponent } from './create-edit-task/modal.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/_models/task';



@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TaskListComponent implements OnInit {
  listTask: Task[] = [];
  taskHours: number = 0;

  displayedColumns: string[] = [ 'name', 'description', 'estimate', 'state', 'action'];
  dataSource: MatTableDataSource<any>;
  selected = '1';

  @ViewChild('input', {static: true}) filter: ElementRef;
  
  private paginatorTask: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginatorTask = mp;
    this.setDataSourceAttributes();
  }

  constructor(public translate: TranslateService, private taskService: TaskService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private router: Router) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.getTasks();
    this.dataSource = new MatTableDataSource(this.listTask);
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginatorTask;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  getTasks(): void {
    let [tasks, hours] = this.taskService.getAllTask();
    this.listTask = tasks;
    this.taskHours = hours;
    this.reloadTable();
  }

  getPlannedTask(): void {
    let [tasks, hours] = this.taskService.getPlannedTask();
    this.listTask = tasks;
    this.taskHours = hours;
    this.reloadTable();
  }

  getInProgressTask(): void {
    let [tasks, hours] = this.taskService.getInProgressTask();
    this.listTask = tasks;
    this.taskHours = hours;
    this.reloadTable();
  }

  getClosedTask(): void {
    let [tasks, hours] = this.taskService.getClosedTask();
    this.listTask = tasks;
    this.taskHours = hours;
    this.reloadTable();
  }

  deleteTask(id:number){
    this.listTask = this.taskService.delete(id);
    this.dataSource = new MatTableDataSource(this.listTask);
    this.dataSource._updateChangeSubscription();
  };
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTask(){
    const dialogRef = this.dialog.open(CreateEditModalComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result == null){
        return;
      }
      this.taskService.createOrUpdateTask(result);
      this.reloadTask();
      this.reloadTable();
    });    
  } 

  editTask(idTask): void{
    let task= this.taskService.getTakById(idTask);
    const dialogRef = this.dialog.open(CreateEditModalComponent, {
        data: { idTask: idTask, task: task }
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result == null){
        return;
      }
      let editedTask = this.taskService.createOrUpdateTask(result);
      this.replaceTaskIfItsNecessary(editedTask);
    });

  }

  replaceTaskIfItsNecessary(task: any){
    let updateItem = this.listTask.find(this.findIndexToUpdate, task.id);

    let index = this.listTask.indexOf(updateItem);
    
    this.listTask[index] = task;
    this.reloadTable()
  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

  changeState(idTask: number){
    var task = this.taskService.changeTaskState(idTask);
    this.replaceTaskIfItsNecessary(task);
  }

  public onOptionsSelected(event) {
    const value = event.value;
    this.selected = value;

    this.reloadTask();
  }

  reloadTask(): void {
    switch(this.selected){
      case "2": {
        this.getPlannedTask();
        break;
      }
      case "3": {
        this.getInProgressTask();
        break;
        
      }
      case "4": {
        this.getClosedTask();
        break;
      }
      default: {
        this.getTasks();
        break;
      }
    }
  }

  reloadTable(){
    this.dataSource = new MatTableDataSource(this.listTask);
    this.setDataSourceAttributes();
    let filterValue = this.filter.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  forceClose(taskId){
    var task = this.taskService.close(taskId);
    this.replaceTaskIfItsNecessary(task);
    this.reloadTable();

  }
}

