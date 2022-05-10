export interface ITaskState{
    state: string;
    nextState: ITaskState;
    
    canChangeState(): boolean;
    canClose(): boolean;
}