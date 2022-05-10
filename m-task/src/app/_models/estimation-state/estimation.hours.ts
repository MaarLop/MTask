import { IEstimation } from './estimation.state.interface';

export class HourEstimation implements IEstimation{
    amount: number;
    isHourEstimated: boolean;

    constructor(hours: number){
        this.amount= hours;
        this.isHourEstimated = true;
    }
    getEstimationLabel(): string {
        var hour = this.amount == 1 ? 'hour' : 'hours';
        return `${this.amount} ${hour}`;
    }

    getAmountOfHour(): number {
        return this.amount;
    }

}