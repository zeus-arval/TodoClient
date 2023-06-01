import {IBaseModel} from "./baseModel";

export interface ITodoCategory extends IBaseModel{
    categoryName: string,
    categorySort: number,
    syncDt?: Date,
}