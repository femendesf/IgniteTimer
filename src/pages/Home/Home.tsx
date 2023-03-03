import { HandPalm, Play } from "phosphor-react";

import { NewCycleForm } from "./components/NewClycleForm";
import { CountDown } from "./components/CountDown";

import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string({required_error: 'Informe a tarefa'}).min(1),
    minutesAmount: zod.number()
    .min(5, {message: "O ciclo precisa ser de no mínimo 5 minutos"})
    .max(60, {message: 'O ciclo precisa ser de no máximo 60 minutos'} )
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home(){

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), // Resolver é um objeto de configuração
        defaultValues:{
            task: '',
            minutesAmount: 0
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm

    const task = watch('task')
    const isSubmitDisabled =!task

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }
    return(
        
        <main className="flex flex-col items-center justify-center flex-1 ">
        
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="" className="flex flex-col items-center gap-14">

                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                   </FormProvider>

                   <CountDown/>

                {activeCycle 
                ? <button  
                        type="button"
                        id="button-submit-timer"   
                        className="bg-red hover:bg-red-dark"
                        onClick={interruptCurrentCycle}
                    >
                        <HandPalm size={24}/>
                        Interromper
                    </button>

                : <button
                    type="submit"
                        id="button-submit-timer"   
                        disabled={isSubmitDisabled}
                        className='bg-green-500 disabled:bg-green-500 hover:bg-green-700 '
                    >
                        <Play size={24}/>
                        Começar:
                </button>
                }
              
            </form>
        </main>
    ) 
}