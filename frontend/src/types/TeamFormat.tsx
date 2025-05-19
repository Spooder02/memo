export interface SimpleTeamInfo {
    teamImage: string;
    teamName: string;
    teamScale: number;
    teamDesc: string;
}

export interface DetailedTeamInfo extends SimpleTeamInfo {
    teammates: string[];

}