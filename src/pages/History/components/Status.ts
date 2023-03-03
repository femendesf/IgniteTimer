import tw from 'tailwind-styled-components'

const STATUS_COLORS = {
    yellow:'before:bg-yellow-500',
    red:'before:bg-red',
    green:'before:bg-green-500'
}

interface StatusProps{
    $statusColor: keyof typeof STATUS_COLORS
}

export const Status = tw.span<StatusProps>`
    flex 
    items-center 
    gap-2 
    before:content-[''] 
    before:w-2 
    before:h-2 
    before:rounded-full
    ${(props) =>STATUS_COLORS[props.$statusColor]}
    
`