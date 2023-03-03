import { Cycle } from "./reducer";

export enum ActionType{
    addNewCycle = 'addNewCycle',
    interruptCurrentCycle = 'interruptCurrentCycle',
    markCycleFinished = 'markCycleFinished'
}

export function addNewCycleAction(newCycle: Cycle){
    return{
        type: ActionType.addNewCycle,
        payload:{
            newCycle,
        },
    }
}
export function interruptCurrentCycleAction(){
    return{
        type: ActionType.interruptCurrentCycle
    }
}
export function markCycleFinishedAction(){
    return{
        type: ActionType.markCycleFinished
    }
}