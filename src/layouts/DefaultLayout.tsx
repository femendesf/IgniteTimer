import { Header } from "../components/Header";
import { Outlet } from 'react-router-dom'

export function DefaultLayout(){
    return(
        <div className="
        max-w-[75rem]
        max-h-full
        my-20
        p-10
        m-auto
        bg-gray-800
        rounded-lg
        flex
        flex-col
        justify-center
        overflow-hidden
        ">
            <Header />
            <Outlet /> 
        </div>
    )
}