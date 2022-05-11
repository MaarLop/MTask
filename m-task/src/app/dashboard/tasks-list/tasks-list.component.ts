import {  ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';

import { TranslateService } from '@ngx-translate/core';
import { CreateEditModalComponent } from './create-edit-task/modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/_models/task';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TaskStateEnum } from 'src/app/_models/enums/task-state-enum';
import { StateListHelper } from 'src/app/helpers/state-list-helper';



@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TaskListComponent implements OnInit, OnDestroy {
  listTask$ = new BehaviorSubject<Task[]>([])
  taskHours: number = 0;

  displayedColumns: string[] = [ 'name', 'description', 'estimate', 'state', 'action'];
  dataSource: MatTableDataSource<any>;
  selected = '0';
  subscriptions: Subscription[] = [];
  taskStates = TaskStateEnum;
  filterValues = [];
  @ViewChild('input', {static: true}) filter: ElementRef;
  
  private paginatorTask: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginatorTask = mp;
    this.setDataSourceAttributes();
  }

  constructor(public translate: TranslateService, private taskService: TaskService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private cdRef:ChangeDetectorRef) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=> s.unsubscribe());
  }
  
  ngOnInit(): void {
    this.filterValues = StateListHelper.buildStateFilterArray();
    this.getTasks(0);
    this.subscriptions.push(this.listTask$.subscribe((tasks)=>{
      this.dataSource = new MatTableDataSource(tasks);
      this.taskHours = this.getHoursOf(tasks);
    }));
  }
  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginatorTask;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  getTasks(filter): void {
    this.subscriptions.push(this.taskService.getTask(filter).subscribe((tasks)=>{
      this.listTask$.next(tasks);
    }));
  }

  deleteTask(id:number){
    this.subscriptions.push(this.taskService.delete(id).subscribe((tasks)=>{
      this.listTask$.next(tasks);
    }));
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
      this.subscriptions.push(this.taskService.createOrUpdateTask(result).subscribe((list)=>{
        this.listTask$.next(list);
      }))
    });    
  } 

  editTask(idTask): void{
    this.subscriptions.push(this.taskService.getTakById(idTask).subscribe((task)=>{
      const dialogRef = this.dialog.open(CreateEditModalComponent, {
        data: { idTask: idTask, task: task }
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result == null){
          return;
        }
        this.subscriptions.push(this.taskService.createOrUpdateTask(result).subscribe((list)=>{
          this.listTask$.next(list);
        }));
      });
    }));
  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

  changeState(idTask: number){
    this.subscriptions.push(this.taskService.changeTaskState(idTask).subscribe((list)=>{
      this.listTask$.next(list);
    }));
  }

  public onOptionsSelected(event) {
    const value = event.value;
    this.selected = value;

    this.getTasks(Number(this.selected));
  }

  forceClose(taskId){
    this.subscriptions.push(this.taskService.close(taskId).subscribe((list)=>{
      this.listTask$.next(list);
    }));
  }

  getHoursOf (taskList: Task[]){
    if(taskList.length > 0){
      return taskList.map(task => task.getHours()).reduce(function(a, b)
      {
        return a + b;
      });
    }
    return 0;
    
  }
}

