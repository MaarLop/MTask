import { TaskStateEnum } from '../enums/task-state-enum';
import { Completed } from './task.state.completed';
import { ITaskState } from './task.state.interface';

export class InProgress implements ITaskState{
    state: TaskStateEnum;
    nextState: ITaskState;

    constructor(){
        this.state= TaskStateEnum.InProgress;
        this.nextState = new Completed();
    }
    canChangeState(): boolean {
        return true;
    }
    canClose(): boolean {
        return true;
    }

}