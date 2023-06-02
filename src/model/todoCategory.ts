import {IBaseModel} from "./baseModel";

export interface ITodoCategory extends IBaseModel{
    categoryName: string,
    categorySort: number,
    syncDt?: Date,
}

export interface IShortenedCategory extends IBaseModel{
    categoryName: string,
}