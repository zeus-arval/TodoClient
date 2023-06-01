import {useContext, useEffect, useState} from "react";
import {ITodoCategory} from "../model/todoCategory";
import {FetchContext} from "../context/FetchContext";

export function useTodoCategories() {
    const {post, put, get, deleteData} = useContext(FetchContext)
    const [todoCategories, setTodoCategories] = useState(Array<ITodoCategory>)
    const endPointName = 'TodoCategories'

    const addCategory = async (todoCategory: ITodoCategory) => {
        let data = await post<ITodoCategory>(todoCategory, endPointName)!
        setTodoCategories(prev => [...prev, data])
    }

    const getCategories = async () => {
        const data = await get(endPointName)
        setTodoCategories(data)
    }

    const updateCategory = async (category: ITodoCategory) => {
        await put<ITodoCategory>(category, category.id!, endPointName)
        setTodoCategories(prev => prev.map(c => {
                if (c.id === category.id){
                    return {
                        id: category.id,
                        categoryName: category.categoryName,
                        categorySort: category.categorySort,
                        syncDt: category.syncDt
                    }
                }

                return c
            }).sort((a: ITodoCategory, b: ITodoCategory) => {
                if (a.categorySort > b.categorySort) return 1
                if (a.categorySort < b.categorySort) return -1
                if (a.categoryName > b.categoryName) return 1
                if (a.categoryName < b.categoryName) return -1
                return 0
            })
        )
    }

    const deleteCategory = async (todoCategory: ITodoCategory) => {
        setTodoCategories(prev => prev.filter(c => c.id !== todoCategory.id))
        await deleteData(todoCategory.id!, endPointName)
    }

    useEffect(() => {
        getCategories()
    }, [])
    return {todoCategories, addCategory, updateCategory, deleteCategory}
}
