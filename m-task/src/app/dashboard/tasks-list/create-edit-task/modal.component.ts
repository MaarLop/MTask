import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Task } from 'src/app/_models/task';
import { IEstimation } from 'src/app/_models/estimation-state/estimation.state.interface';
import { ITaskState } from 'src/app/_models/task-state-state/task.state.interface';
import { TaskService } from 'src/app/services/task.service';
import { EstimationContext } from 'src/app/_models/estimation-state/estimaioncontext';
import { StateContext } from 'src/app/_models/task-state-state/task.state.context';
import { TaskStateEnum } from 'src/app/_models/enums/task-state-enum';
import { EstimationTypeEnum } from 'src/app/_models/enums/estimation-type-enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class CreateEditModalComponent implements OnInit {
  
  selectedState: any;
  estimationType:any;

  newTaskForm:FormGroup;
  idTask:number;
  task: any;
  taskStates = TaskStateEnum;
  estimationTypeEnum = EstimationTypeEnum;
  
  constructor(  public dialogRef: MatDialogRef<CreateEditModalComponent>,
                private fb: FormBuilder,
                private snackBar:MatSnackBar,
                private taskService: TaskService,
                public translate: TranslateService,
                @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.createForm();
    if(data != null){
      this.task= data.task;
      this.idTask= data.idTask;
      this.selectedState = 1;
      this.estimationType = 1;
    }
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    if (this.idTask !== undefined) {
      this.edit();
    }
  }
  edit() {
    this.estimationType = this.task.estimate.isHourEstimated ? "1" : "2";
    this.selectedState = this.task.state.state.toString();
    console.log(this.selectedState)
    this.newTaskForm.patchValue({
      name: this.task.name,
      description: this.task.description,
      amount:this.task.estimate.amount,
      typeEstimate: this.estimationType,
      state: this.selectedState     
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  createForm() {
    this.newTaskForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      amount: ['', [Validators.required]],
      typeEstimate: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }
  
  saveTask() {
    let taskId= this.idTask ?? 0;
    let name= this.newTaskForm.get('name').value;
    let description =  this.newTaskForm.get('description').value;
    let amount = this.newTaskForm.get('amount').value;
    let typeEstimate = this.newTaskForm.get('typeEstimate').value;
    let selectedState =  this.newTaskForm.get('state').value;

    let estimation: IEstimation = this.createEstimation(amount, typeEstimate);
    let state: ITaskState = this.createState(selectedState);

    const task: Task = new Task(taskId, name, description,estimation, state);

    this.createOrUpdateTask(task);
  }

  createOrUpdateTask(task: any){
    let message = task.id === 0 ? this.translate.instant('TaskSaved') : this.translate.instant('TaskUpdated');
    let newTask = this.taskService.createOrUpdateTask(task);
    this.snackBar.open(message, '', {
      duration: 4500
    });

    this.dialogRef.close(newTask);

  }

  createEstimation(amount, type): IEstimation{
    return EstimationContext.getEstimation(amount,Number(type));
  }

  createState(type: number): ITaskState{
    return StateContext.getState(Number(type));
  }
  

}
