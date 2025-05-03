import { TimeSelectionObject } from "./TimeSelectionObject";

export interface SimplePlan {
    id: number;
    teamName: string;
    teamScale: number;
    meetingName: string;
    dayLeft: string;
    color: string;
}

export interface RegisterPlanDetails {
    plan: TimeSelectionObject;
    selectedTime: number[];
    priority: string;
    disclosureRange: string[];
    availableChannel: string;
    description: string;
}