import { TimeSelectionDate } from "./DateFormat";
import { RegisterPlanDetails } from "./PlanFormat";

export interface TimeSelectionObject {
    date: TimeSelectionDate;
    times: number[];
    details: RegisterPlanDetails;
}