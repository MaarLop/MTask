import { TaskStateEnum } from '../enums/task-state-enum';
import { ITaskState } from './task.state.interface';

export class Completed implements ITaskState{
    state: TaskStateEnum;
    nextState: ITaskState;

    constructor(){
        this.state= TaskStateEnum.Completed;
        this.nextState = null;
    }
    canChangeState(): boolean {
        return false;
    }
    canClose(): boolean {
        return false;
    }

}