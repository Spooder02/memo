export interface CurrentDate {
    year: number;
    month: number;
}

export interface CalendarProps {
    currentDate: CurrentDate;
    setCurrentDate: React.Dispatch<React.SetStateAction<CurrentDate>>;
}