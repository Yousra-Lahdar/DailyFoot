export type AgendaEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
    type?: string;
    description?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
};

export type AgendaEventFormatted = AgendaEvent & {
    dateHeureDebut: string | Date;
    dateHeureFin: string | Date;
    ownerType: string;
}
