import { DayEstimation } from './estimation.days';
import { HourEstimation } from './estimation.hours';
import { IEstimation } from './estimation.state.interface';

export abstract class EstimationContext{
    static getEstimation(amount: number, type: string): IEstimation{
        switch (type) {
            case '2':{
                return new DayEstimation(amount);
            }
            default: {
                return new HourEstimation(amount);
            }
        }
    }
}