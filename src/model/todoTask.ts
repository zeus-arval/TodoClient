import {IBaseModel} from "./baseModel";

export interface ITodoTask extends IBaseModel{
    taskName: string,
    taskSort: number,
    createdDt: string,
    dueDt?: string,
    isCompleted: boolean,
    isArchived: boolean,
    todoCategoryId: string,
    todoPriorityId: string,
    syncDt?: string,
}