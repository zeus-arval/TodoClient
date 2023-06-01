import {useContext, useEffect, useState} from "react";
import {FetchContext} from "../context/FetchContext";
import {ITodoPriority} from "../model/todoPriority";

export function useTodoPriorities(){
    const {post, put, get, deleteData} = useContext(FetchContext)
    const [todoPriorities, setTodoPriorities] = useState(Array<ITodoPriority>)
    const endPointName = 'TodoPriorities'

    const addPriority = async(todoPriority: ITodoPriority) =>{
        let data = await post<ITodoPriority>(todoPriority, endPointName)!
        setTodoPriorities(prev => [...prev, data])
    }

    const getPriorities = async () => {
        const data = await get(endPointName)
        setTodoPriorities(data)
    }

    const updatePriority = async (priority: ITodoPriority) => {
        await put<ITodoPriority>(priority, priority.id!, endPointName)
        setTodoPriorities(prev => prev.map(c => {
                if(c.id === priority.id){
                    return {
                        id: priority.id,
                        priorityName: priority.priorityName,
                        prioritySort: priority.prioritySort,
                        syncDt: priority.syncDt,
                        appUserId: priority.appUserId,
                    }
                }

                return c
            }).sort((a: ITodoPriority, b: ITodoPriority) => {
                if (a.prioritySort > b.prioritySort) return 1
                if (a.prioritySort < b.prioritySort) return -1
                if (a.priorityName > b.priorityName) return 1
                if (a.priorityName < b.priorityName) return -1
                return 0
            })
        )
    }

    const deletePriority = async (todoPriority: ITodoPriority) => {
        setTodoPriorities(prev => prev.filter(c => c.id !== todoPriority.id))
        await deleteData(todoPriority.id!, endPointName)
    }

    useEffect(() => {
        getPriorities()
    }, [])

    return {todoPriorities, addPriority, getPriorities, updatePriority, deletePriority}
}