import { Timer, Scroll } from 'phosphor-react'
import {NavLink} from 'react-router-dom'
import LogoIgnite from '../assets/logo.svg'

export function Header(){

    const styleLink = 'w-12 h-12 flex justify-center items-center border-solid border-y-[3px] border-transparent hover:border-b-green-500'
    
    return(
        <div className="flex items-center justify-between">

            <span><img src={LogoIgnite} alt=""/></span>

            <nav className='flex gap-2 text-gray-100'>
                <NavLink 
                
                    to="/" 
                    className={(navData) => navData.isActive ? `${styleLink} text-green-500` : styleLink }
                    title='Timer'
                   
                >
                    <Timer className='' size={24}/>
                </NavLink>

                <NavLink 
                    to='/history' 
                    className={(navData) => navData.isActive ? `${styleLink} text-green-500` : styleLink }
                >
                    <Scroll size={24}/>
                </NavLink>

                
            </nav>
        </div>
    ) 
}