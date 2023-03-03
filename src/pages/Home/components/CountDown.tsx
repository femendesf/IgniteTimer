import { useContext, useEffect, useState } from "react"

import {differenceInSeconds} from 'date-fns'
import { CyclesContext } from "../../../contexts/CyclesContext"
 
export function CountDown(){

    const {activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed,setSecondsPassed} = useContext(CyclesContext)

    // Calculo para o timer-------------------------------------------------------
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ?totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0') // padStart para definir quantos caracteres vai ter essa variavel, caso seja menor que o tamanho defido, irá ser adicionado o valor que foi definido na função
    const seconds = String(secondsAmount).padStart(2, '0')
   //-------------------------------------------------------------------------------

   useEffect(() => { // Controlador countdown
        let interval: any

        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference = (differenceInSeconds(new Date(), new Date(activeCycle.startDate))) // Reduzindo o countdown de acordo com a diferença do tempo que foi iniciado com o tempo atual
                
                if(secondsDifference >= totalSeconds){ // Verifica se o countdown foi finalizado.
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else{
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycleId, totalSeconds, seconds, activeCycle, markCurrentCycleAsFinished])

    useEffect(() => { // Timer no titulo da página
        if(activeCycle){
            document.title= `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return(
        <div 
            className="font-Roboto-Mono items-center justify-center text-[10rem] leading-[8rem] text-gray-100 flex gap-4 flex-1" 
            id="CountContainer"
            >
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <div id="separator">:</div>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </div>
    )
}