import { useContext} from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm(){

    const {activeCycle} = useContext(CyclesContext)

    const {register} = useFormContext()

    return(
        <div 
            id="form" 
            className="flex w-full text-lg items-center justify-center gap-2 text-gray-100  font-bold flex-wrap"
        >
            <label htmlFor="task">Vou trabalhar em</label>
            <input 
                id="task" 
                className="flex-1 hid"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                {...register('task')}
                disabled={!!activeCycle}
            />

            <datalist id="task-suggestions" >
                <option value="Option 1"/>
                <option value="Option 2"/>
                <option value="Option 3"/>
                <option value="Roça roça em mim"/>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <input 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                className="w-16"
                step={5}
                min={5}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
                disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </div>
    )
}