import { EstimationTypeEnum } from '../enums/estimation-type-enum';
import { DayEstimation } from './estimation.days';
import { HourEstimation } from './estimation.hours';
import { IEstimation } from './estimation.state.interface';

export abstract class EstimationContext{
    static getEstimation(amount: number, type: EstimationTypeEnum): IEstimation{
        switch (type) {
            case EstimationTypeEnum.Days:{
                return new DayEstimation(amount);
            }
            default: {
                return new HourEstimation(amount);
            }
        }
    }
}