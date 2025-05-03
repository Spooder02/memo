export interface CurrentDate {
    year: number;
    month: number;
}

export interface CalendarProps {
    currentDate: CurrentDate;
    setCurrentDate: React.Dispatch<React.SetStateAction<CurrentDate>>;
}

export interface TimeSelectionDate {
    year: number;
    month: number;
    day: number;
}

export interface FullTimeInfo extends TimeSelectionDate {
    weekNum: number;
}