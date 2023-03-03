import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCycleFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData{
    task: string,
    minutesAmount: number
}

interface CycleContextType{
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: CreateCycleData) => void,
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({children} : CyclesContextProviderProps){

   const [cyclesState, dispatch] = useReducer(cyclesReducer,{
        cycles: [],
        activeCycleId: null,
    }, () => { // Função para recuperar os dados 
        const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

        if(storageStateAsJSON){
            return JSON.parse(storageStateAsJSON)
        }
   })

    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId) // Guarda id do cyclo ativo
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate)) // Reduzindo o countdown de acordo com a diferença do tempo que foi inciado com o tempo atual
        }

        return 0
    })

    useEffect(() => { // Armazenar os ciclos em um storage
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    })

    function markCurrentCycleAsFinished(){ // Função para quando o ciclo for concluído
        dispatch(markCycleFinishedAction())
    }
    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData){ //Função para criar um novo ciclo
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle(){ // Função para quando o ciclo for interrompido
        dispatch(interruptCurrentCycleAction())
    }

    return(
        <CyclesContext.Provider
        value={{
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished,
            amountSecondsPassed, 
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            cycles,
        }}
    >
        {children}
    </CyclesContext.Provider>
    )
}
    
    