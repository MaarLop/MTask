import { IEstimation } from './estimation.state.interface';

export class DayEstimation implements IEstimation{
    amount: number;
    isHourEstimated: boolean;

    constructor(days: number){
        this.amount= days;
        this.isHourEstimated = false;
    }
    getEstimationLabel(): string {
        var day = this.amount == 1 ? 'day' : 'days';
        return `${this.amount} ${day}`;
    }

    getAmountOfHour(): number {
        return this.amount * 24;
    }

    

}