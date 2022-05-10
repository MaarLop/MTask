import { InProgress } from './task.state.inprogress';
import { ITaskState } from './task.state.interface';

export class Planned implements ITaskState{
    state: string;
    nextState: ITaskState;

    constructor(){
        this.state= "Planned";
        this.nextState = new InProgress();
    }
    canChangeState(): boolean {
        return true;
    }
    canClose(): boolean {
        return true;
    }

}