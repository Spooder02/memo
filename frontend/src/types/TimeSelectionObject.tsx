import { TimeSelectionDate } from "./DateFormat";

export type TimeDiv = "오전" | "오후";

export interface TimeSelectionObject {
    date: TimeSelectionDate;
    times: number[];
    timeDiv: TimeDiv;
}