import { IEstimation } from './estimation-state/estimation.state.interface';
import { Completed } from './task-state-state/task.state.completed';
import { InProgress } from './task-state-state/task.state.inprogress';
import { ITaskState } from './task-state-state/task.state.interface';
import { Planned } from './task-state-state/task.state.planned';

export class Task {

    id: number;
    name: string;
    description: string;
    estimate: IEstimation;
    state: ITaskState;

    constructor( id: number, name: string, desctiption: string, estimate: IEstimation, state: ITaskState){
        this.id= id;
        this.name = name;
        this.description = desctiption;
        this.estimate = estimate,
        this.state = state;
    }

    close() {
      if(this.state.canClose()){
        this.state = this.state.nextState;
      }
      else {
        throw new Error('Task must be in progress state to be closed')
      }
    }
    isInProgress(): boolean {
      return this.state instanceof InProgress;
    }
    isCompleted(): boolean {
      return this.state instanceof Completed;
    }
    isPlanned(): boolean {
      return this.state instanceof Planned;
    }

    changeState(){
      if(this.state.canChangeState()){
        this.state = this.state.nextState;
      }
    }

    getEstimationLabel():string {
      return this.estimate.getEstimationLabel();
    }

    getNameOfState(): string{
      return this.state.state;
    }

    getHours(): number {
      return this.estimate.getAmountOfHour();
    }
}