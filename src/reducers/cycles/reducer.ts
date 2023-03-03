import {produce} from 'immer'

import { ActionType } from "./actions"

interface CyclesState{
    cycles: Cycle[],
    activeCycleId: string | null
}


export interface Cycle{
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}


export function cyclesReducer(state: CyclesState, action: any) {
    switch(action.type){
        case ActionType.addNewCycle:
            /*return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle], // Adicionando um novo ciclo
                activeCycleId: action.payload.newCycle.id // Guardando o id do ciclo ativo
            }*/

            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })

        case ActionType.interruptCurrentCycle:{
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id == state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, draft => {
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
                draft.activeCycleId = null
            })
        }


        case ActionType.markCycleFinished:{
            /*return{
                ...state,
                cycles: state.cycles.map(cycles => { // Verificando o id do ciclo finalizado e adicionando a data da finalização.
                    if(cycles.id === state.activeCycleId){
                        return {...cycles, finishedDate: new Date()}
                    }else{
                        return cycles
                    }
                }),
                activeCycleId: null
            }*/ 

            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id == state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, draft => {
                draft.cycles[currentCycleIndex].finishedDate = new Date()
                draft.activeCycleId = null
            })
        }
           

            
            
        default: return state
    }
}