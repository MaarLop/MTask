import { Completed } from './task.state.completed';
import { ITaskState } from './task.state.interface';

export class InProgress implements ITaskState{
    state: string;
    nextState: ITaskState;

    constructor(){
        this.state= "InProgress";
        this.nextState = new Completed();
    }
    canChangeState(): boolean {
        return true;
    }
    canClose(): boolean {
        return true;
    }

}