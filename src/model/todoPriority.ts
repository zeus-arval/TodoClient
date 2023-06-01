export interface ITodoPriority{
    id?: string,
    appUserId?: string,
    priorityName: string, //128 - max length
    prioritySort: number,
    syncDt?: string,
}