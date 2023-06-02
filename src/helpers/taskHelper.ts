import {ITodoTask} from "../model/todoTask";
import {convertStringToDate, getFormattedDateNow} from "./dateHelper";
import {IShortenedCategory} from "../model/todoCategory";
import {IShortenedPriority} from "../model/todoPriority";

export const formatTask: (deadline: string, task: ITodoTask, categories: IShortenedCategory[], priorities: IShortenedPriority[])
    => ITodoTask = (deadline: string, task: ITodoTask, categories: IShortenedCategory[], priorities: IShortenedPriority[]) => {
    const formattedDeadline = convertStringToDate(deadline)
    const currentDate = getFormattedDateNow()

    const categoryId = categories.find(c => c.categoryName === task.todoCategoryId)?.id ?? ''
    const priorityId = priorities.find(c => c.priorityName === task.todoPriorityId)?.id ?? ''

    return {
        taskName: task.taskName,
        taskSort: task.taskSort,
        createdDt: currentDate,
        dueDt: formattedDeadline,
        todoCategoryId: categoryId,
        todoPriorityId: priorityId,
        isCompleted: false,
        isArchived: false,
    }
}