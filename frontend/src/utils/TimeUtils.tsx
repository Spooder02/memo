// display 및 내부 처리를 위한 시간 포맷팅 (90 -> 1:30)
export const formatTime = (totalMinutes: number) => {
    if (totalMinutes == 0)
        return '12:00';
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60 == 0? '00':  totalMinutes % 60;

    return `${hours}:${minutes}`;
};

export const getThisWeekDates = () => {
    const today = new Date();
    const day = today.getDay(); // 0(일) ~ 6(토)
    const sundayOffset = -day;
    
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + sundayOffset + i);
        return d.getDate();  // 날짜(1~31)만 반환
    });
}