export interface IEstimation{
    amount: number;
    isHourEstimated:boolean;
    
    getAmountOfHour(): number

    getEstimationLabel(): string;

}