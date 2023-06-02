import {CustomColorButton} from "./Button";

interface IRowCellProps{
    color: string,
    data: any,
    width: string
}

interface IRowCellUpdateDeleteButtonsProps extends IRowCellProps{
    updateData: (data: any) => void,
    deleteData: (data: any) => void,
}

export function HeaderRowCellData({color, data, width}: IRowCellProps){
    let className = `h-14 bg-gray-200 m-1 flex items-center px-4 ${width}`

    return (
        <th className={className}
            style={{backgroundColor: color}}>
            {data}
        </th>
    )
}

export function RowCellData({color, data, width}: IRowCellProps) {
    let className = `h-14 bg-gray-200 m-1 flex items-center px-4 ${width}`
    return (
        <td className={className} style={{backgroundColor:color}}>
            {data}
        </td>
    )
}

export function RowCellUpdateDeleteButtons({color, data, width, deleteData, updateData}: IRowCellUpdateDeleteButtonsProps){
    let className = `h-14 bg-gray-200 m-1 flex items-center px-4 justify-center ${width}`
    const updateHandler = () => updateData(data)
    const deleteHandler = () => deleteData(data)

    return (
        <td className={className} style={{backgroundColor:color}}>
            <div className='flex flex-row justify-center'>
                <CustomColorButton colorClass='bg-sky-600' type='button' onClick={updateHandler} text='Update'/>
                <CustomColorButton colorClass='bg-red-500' type='button' onClick={deleteHandler} text='Delete'/>
            </div>
        </td>
    )
}