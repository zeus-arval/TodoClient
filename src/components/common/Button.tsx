interface IButtonProps {
    type: 'button' | 'submit',
    text: string,
    onClick?: () => void,
}

interface ICustomColorButtonProps extends IButtonProps{
    colorClass: string,
    customClass?: string,
}

export function GreenButton({type, text, onClick}: IButtonProps) {
    if (onClick === undefined){
        onClick = () => {}
    }

    return (
        <button
            onClick={onClick}
            type={type}
            className='rounded-xl py-3 px-14 font-bold bg-pastel-green-100 hover:bg-pastel-green-200 text-white'
        >{text}</button>
    )
}

export function CustomColorButton({type, text, onClick, colorClass, customClass}: ICustomColorButtonProps){
    const className = customClass ?? `mx-5 rounded px-8 py-1 text-white ${colorClass}`

    if (onClick === undefined){
        onClick = () => {}
    }

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}>
            {text}
        </button>
    )
}