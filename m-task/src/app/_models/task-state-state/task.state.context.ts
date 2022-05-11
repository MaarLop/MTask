import { InProgress } from './task.state.inprogress';
import { ITaskState } from './task.state.interface';
import { Planned } from './task.state.planned';
import { Completed } from './task.state.completed';
import { TaskStateEnum } from '../enums/task-state-enum';

export abstract class StateContext{
    static getState(type: TaskStateEnum): ITaskState{
        switch (type) {
            case TaskStateEnum.Planned:{
                return new Planned();
            }
            case TaskStateEnum.InProgress:{
                return new InProgress();
            }
            default:{
                return new Completed();
            }

        }
    }
}