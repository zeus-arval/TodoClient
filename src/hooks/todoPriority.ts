import {useContext, useEffect, useState} from "react";
import {FetchContext} from "../context/FetchContext";
import {ITodoPriority} from "../model/todoPriority";

export const useTodoPriorities = () => {
    const {post, put, get, deleteData} = useContext(FetchContext)
    const [todoPriorities, setTodoPriorities] = useState(Array<ITodoPriority>)
    const endPointName = 'TodoPriorities'

    const addPriority = async (priority: ITodoPriority) => {
        let data = await post<ITodoPriority>(priority, endPointName)!
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

    const deletePriority = async (priority: ITodoPriority) => {
        setTodoPriorities(prev => prev.filter(c => c.id !== priority.id))
        await deleteData(priority.id!, endPointName)
    }

    useEffect(() => {
        getPriorities()
    }, [])

    return {todoPriorities, addPriority, getPriorities, updatePriority, deletePriority}
}