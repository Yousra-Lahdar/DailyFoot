import type {PlayerStats} from "./Player.ts";

export type Statistics = {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
    height: number;
    weight: number;
}
export type PlayerStatistics  = {
    player: PlayerStats | PlayerStats[];
    statistics: Statistics;
}
export type StatisticsWithoutHeightAndWeight = {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
}