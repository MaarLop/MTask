import { TaskStateEnum } from "../enums/task-state-enum";

export interface ITaskState{
    state: TaskStateEnum;
    nextState: ITaskState;
    
    canChangeState(): boolean;
    canClose(): boolean;
}