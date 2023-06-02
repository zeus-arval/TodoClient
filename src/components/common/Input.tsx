import {ChangeEvent, HTMLInputTypeAttribute} from "react";

interface IFormInputProps {
    title: string,
    onChange: (event: ChangeEvent<any>) => void,
    type: 'number' | 'text' | 'date',
    value: any,
    condition?: {},
}

interface IFormDatalistInputProps {
    options: string[],
    title: string,
    onChange: (event: ChangeEvent<any>) => void,
    value: any,
}

export function FormInput({title, onChange, type, value, condition}: IFormInputProps) {
    return (
        <>
            <p className='text-left'>{title}:</p>
            <input
                type={type}
                className='border py-2 px-4 mb-2 w-full outline-0'
                value={value}
                onChange={onChange}
                {...condition}
            />
        </>
    )
}

export function FormSelect({title, onChange, value, options}: IFormDatalistInputProps){
    return (
        <>
            <p className='text-left'>{title}:</p>
            <select
                className='border py-2 px-4 mb-2 w-full outline-0'
                value={value ?? options[0] ?? 'No available value'}
                onChange={onChange}
            >
                {options.map((option, key) =>
                    <option
                        className='w-full bg-blue-300 rounded-b'
                        key={key}>{option}</option>)}
            </select>
        </>
    )
}