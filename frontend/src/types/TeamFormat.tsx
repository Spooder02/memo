export interface SimpleTeamInfo {
    teamName: string;
    teamScale: number;
    description: string;
}

export interface DetailedTeamInfo extends SimpleTeamInfo {
    teammates: string[];

}