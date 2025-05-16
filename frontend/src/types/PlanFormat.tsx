export interface SimplePlan {
    id: number;
    teamName: string;
    teamScale: number;
    meetingName: string;
    dayLeft: string;
    color: string;
}

export interface RegisterPlanDetails {
    selectedTime: string;
    priority: string;
    disclosureRange: string;
    availableChannel: string;
    description: string;
}