import {IBaseModel} from "./baseModel";

export interface ITodoPriority extends IBaseModel{
    appUserId?: string,
    priorityName: string, //128 - max length
    prioritySort: number,
    syncDt?: string,
}

export interface IShortenedPriority extends IBaseModel{
    priorityName: string
}