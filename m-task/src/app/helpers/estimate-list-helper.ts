import { EstimationTypeEnum } from "../_models/enums/estimation-type-enum";
import { TaskStateEnum } from "../_models/enums/task-state-enum";
import { Option } from "../_models/option";

export abstract class EstimateListHelper{
    static buildStateFilterArray(): Object[] {
        const isNumber = value => isNaN(Number(value));
        return Object.keys(EstimationTypeEnum).filter((isNumber))
                  .map(key => (new Option(EstimationTypeEnum[key], key )));
     }
}