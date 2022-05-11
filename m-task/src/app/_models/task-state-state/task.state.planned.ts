import { TaskStateEnum } from '../enums/task-state-enum';
import { InProgress } from './task.state.inprogress';
import { ITaskState } from './task.state.interface';

export class Planned implements ITaskState{
    state: TaskStateEnum;
    nextState: ITaskState;

    constructor(){
        this.state= TaskStateEnum.Planned;
        this.nextState = new InProgress();
    }
    canChangeState(): boolean {
        return true;
    }
    canClose(): boolean {
        return true;
    }

}