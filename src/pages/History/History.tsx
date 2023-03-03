import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { Status } from "./components/Status";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale";

export function History(){
    const {cycles} = useContext(CyclesContext)

    return(
        <main className="flex flex-1 flex-col p-14">

            <h1 className="text-2xl text-gray-100 mb-8">Meu histórico</h1>
            
            <div id="history-list" className="flex-1 overflow-auto max-h-96">

                <table className="w-full border-collapse min-w-[300px]">

                    <thead>
                        <tr>
                            <th className="rounded-l-lg pl-6">Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th className="rounded-r-lg pr-6">Status</th>
                        </tr>
                    </thead>

                    <tbody id="body-table">
                        {cycles.map(cycle =>{
                            return(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount}</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix:true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                       {cycle.finishedDate && (
                                         <Status $statusColor="green">Concluído</Status>
                                       )}
                                       {cycle.interruptedDate && (
                                         <Status $statusColor="red">Interrompido</Status>
                                       )}
                                       {!cycle.finishedDate && !cycle.interruptedDate && (
                                         <Status $statusColor="yellow">Em andamento</Status>
                                       )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}