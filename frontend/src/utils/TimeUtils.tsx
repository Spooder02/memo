/**
 * 분단위의 숫자를 "HH:MM" 형식의 문자열로 변환합니다.
 * @param time - 0부터 1425까지의 15분 단위 숫자 (예: 720은 12:00)
 * @returns "HH:MM" 형식의 시간 문자열
 */
export const formatTime = (time: number): string => {
    if (time === 0 || time === 720) return "12:00";
    if (time === 15 || time === 735) return "12:15";
    if (time === 30 || time === 750) return "12:30";
    if (time === 45 || time === 765) return "12:45";
    
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};

export const getWeekInfo = (date: Date): { month: number, week: number } => {
    const dateCopy = new Date(date);
    const dayOfWeek = dateCopy.getDay(); // 0 (일) ~ 6 (토)

    dateCopy.setDate(dateCopy.getDate() - dayOfWeek);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(dateCopy);
        d.setDate(d.getDate() + i);
        return d;
    });

    const monthCounts: { [key: number]: number } = {};
    for (const day of weekDays) {
        const month = day.getMonth() + 1;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    }

    let majorityMonth = 0;
    let maxCount = 0;
    for (const month in monthCounts) {
        if (monthCounts[month] > maxCount) {
            maxCount = monthCounts[month];
            majorityMonth = parseInt(month, 10);
        }
    }
    
    const representativeDay = weekDays[3]; 
    const weekNumber = getWeekOfMonth(representativeDay);

    return { month: majorityMonth, week: weekNumber };
};

/**
 * 정렬된 시간 배열을 받아서 연속된 시간을 그룹화하고 포맷팅합니다.
 * @param sortedTimes - 정렬된 분단위 시간 배열 (예: [0, 15, 30, 90])
 * @param gap - 그룹화를 위한 시간 간격 (분)
 * @returns 그룹화되고 포맷팅된 시간 문자열 배열 (예: ["00:00 ~ 00:30", "01:30"])
 */
export const groupAndFormatTimes = (sortedTimes: number[], gap: number): string[] => {
    if (sortedTimes.length === 0) return [];
  
    const grouped: string[] = [];
    let currentGroup: number[] = [sortedTimes[0]];
  
    for (let i = 1; i < sortedTimes.length; i++) {
      if (sortedTimes[i] - currentGroup[currentGroup.length - 1] === gap) {
        currentGroup.push(sortedTimes[i]);
      } else {
        if (currentGroup.length > 1) {
          const startTime = formatTime(currentGroup[0]);
          const endTime = formatTime(currentGroup[currentGroup.length - 1] + gap - 15); // inclusive end time
          grouped.push(`${startTime} ~ ${endTime}`);
        } else {
          grouped.push(formatTime(currentGroup[0]));
        }
        currentGroup = [sortedTimes[i]];
      }
    }
  
    // 마지막 그룹 처리
    if (currentGroup.length > 1) {
      const startTime = formatTime(currentGroup[0]);
      const endTime = formatTime(currentGroup[currentGroup.length - 1]);
      grouped.push(`${startTime} ~ ${formatTime(endTime.split(':').map(Number)[0]*60 + endTime.split(':').map(Number)[1] + gap - 15)}`);
    } else if (currentGroup.length === 1) {
      grouped.push(formatTime(currentGroup[0]));
    }
  
    return grouped;
};

/**
 * Date 객체를 인자로 받아 해당 월을 반환합니다.
 * @param date - 정보를 가져올 Date 객체
 * @returns 월 (1-12)
 */
export const getMonth = (date: Date): number => {
    return date.getMonth() + 1;
};

/**
 * Date 객체를 인자로 받아 해당 날짜가 월의 몇 주차인지 계산합니다.
 * @param date - 정보를 가져올 Date 객체
 * @returns 주차 (예: 1, 2, 3, 4, 5)
 */
export const getWeekOfMonth = (date: Date): number => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0: Sunday, 1: Monday, ...
    const offsetDate = date.getDate() + firstDayOfWeek - 1;
    return Math.floor(offsetDate / 7) + 1;
};

/**
 * Date 객체를 인자로 받아 해당 날짜가 포함된 주의 모든 날짜(일)를 배열로 반환합니다.
 * (일요일 시작 기준)
 * @param date - 정보를 가져올 Date 객체
 * @returns 해당 주의 날짜(일)들이 담긴 숫자 배열
 */
export const getWeekDates = (date: Date): number[] => {
    const weekDates: number[] = [];
    const currentDate = new Date(date);
    const currentDay = currentDate.getDay(); // 0 for Sunday

    currentDate.setDate(currentDate.getDate() - currentDay);

    for (let i = 0; i < 7; i++) {
        weekDates.push(currentDate.getDate());
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekDates;
};

/**
 * (모달용 헬퍼) 특정 연도와 월에 해당하는 모든 주의 시작 날짜(일요일) 배열을 반환합니다.
 * @param year - 연도
 * @param month - 월 (0-11)
 * @returns 해당 월의 모든 주의 시작 날짜가 담긴 Date 객체 배열
 */
export const getWeeksForMonth = (year: number, month: number): Date[] => {
    const weeks: Date[] = [];
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const currentDay = new Date(firstDay);
    
    // 달력 기준 첫 번째 날짜 (첫째 날이 속한 주의 일요일)
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());

    // 월이 끝날 때까지 7일씩 더해가며 주를 추가
    while (true) {
        weeks.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 7);
        // 다음 주의 시작일이 해당 월을 벗어났고, 이미 4주 이상 추가되었으면 중단
        if (currentDay.getMonth() !== month && weeks.length >= 4) {
            break;
        }
    }
    
    return weeks;
}

export const getThisMonth = (): number => {
    return getMonth(new Date());
};

export const getThisWeek = (): number => {
    return getWeekOfMonth(new Date());
};