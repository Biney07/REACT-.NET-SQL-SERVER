export interface Banori {
    id: number;
    name: string;
    biografia: string;
    price: number;
    File?: File;
    pictureUrl: string;
    relationshipStatus: boolean;
    profesioni: string;
    age: number;
    nominated:boolean;
    eleminuar:boolean;
}

export interface BanoriParams {
    orderBy: string;
    searchTerm?: string;
    profesionet: string[];
    pageNumber: number;
    pageSize: number;
}