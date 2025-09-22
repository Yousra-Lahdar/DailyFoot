export type Player = {
    name: string;
    age?: number;
    nationality?: string;
    poste?: string;
    club?: string;
    email?: string;
    image?: string;
}

export type PlayerStats = Player & {
    id: number;
    height: number;
    weight: number;
}

export type PlayerWithId = Player & {
    id: number;
}
export type PlayerWithHeightAndWeight = Player & {
    height: number;
    weight: number;
}

export type Props = {
    player: PlayerWithId;
}
