// display 및 내부 처리를 위한 시간 포맷팅 (90 -> 1:30)
export const formatTime = (totalMinutes: number) => {
    if (totalMinutes == 0)
        return '12:00';

    if (totalMinutes == 30)
        return '12:30';
    
    const hours = Math.floor(totalMinutes / 60);
    const formattedHours = hours > 12? hours-12: hours;
    const minutes = totalMinutes % 60 == 0? '00':  totalMinutes % 60;

    return `${formattedHours}:${minutes}`;
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

export const getThisMonth = () => {
    return new Date().getMonth() + 1;
}

export const getThisWeek = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const firstDay = new Date(today.setDate(0)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
}

export const groupAndFormatTimes = (sortedTimes: number[], timeFilter: number): string[] => {
  const selectedTime: string[] = [];

  // 빈 배열이 들어오면 기본 배열 반환
  if (sortedTimes.length === 0) return selectedTime;

  let startIndex = 0;

  for (let i = 0; i < sortedTimes.length; i++) {
    const isEndOfGroup = (i === sortedTimes.length - 1) || (sortedTimes[i + 1] - sortedTimes[i] !== timeFilter);

    if (isEndOfGroup) {
      const startTime = sortedTimes[startIndex];
      const endTime = sortedTimes[i];

      if (startIndex === i)
        selectedTime.push(formatTime(startTime));
      else
        selectedTime.push(`${formatTime(startTime)} ~ ${formatTime(endTime)}`);

      // 다음 그룹 또는 단일 시간의 시작 인덱스를 현재 인덱스의 다음으로 업데이트
      startIndex = i + 1;
    }
  }

  return selectedTime.sort(); // 마지막엔 정렬시켜 반환(* push로 인해 정렬이 안됨)
}