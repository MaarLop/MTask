import { TaskStateEnum } from "../_models/enums/task-state-enum";
import { Option } from "../_models/option";

export abstract class StateListHelper{
    static buildStateFilterArray(): Object[] {
        const isNumber = value => isNaN(Number(value));
        return Object.keys(TaskStateEnum).filter((isNumber))
                  .map(key => (new Option(TaskStateEnum[key], key )));
     }
}