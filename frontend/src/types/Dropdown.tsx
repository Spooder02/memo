export type DropdownItemState = {
    isOpen: boolean;
    options: any[];
    selectedValue: string;
}

export const timeDivOptions = ["오전", "오후"];
export const timeFilterOptions = ["15분마다", "30분마다", "1시간마다"];
export const priorityOptions = ["가장 이른 시간", "중간 시간대", "가장 늦은 시간"];
export const availableChannelOptions = ["온/오프라인 모두 가능", "오프라인만 가능", "온라인만 가능"];