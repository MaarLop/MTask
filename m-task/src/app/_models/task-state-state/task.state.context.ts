import { InProgress } from './task.state.inprogress';
import { ITaskState } from './task.state.interface';
import { Planned } from './task.state.planned';
import { Completed } from './task.state.completed';

export abstract class StateContext{
    static getState(type: string): ITaskState{
        switch (type) {
            case 'Planned':{
                return new Planned();
            }
            case 'InProgress':{
                return new InProgress();
            }
            default:{
                return new Completed();
            }

        }
    }
}