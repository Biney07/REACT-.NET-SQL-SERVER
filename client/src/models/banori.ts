export interface Banori {
    id: number;
    name: string;
    biografia: string;
    price: number;
    File?: File;
    pictureUrl: string;
    RelationshipStatus: boolean;
    profesioni: string;
    age: number;
    nominated:boolean;
}

export interface BanoriParams {
    orderBy: string;
    searchTerm?: string;
    profesionet: string[];
    pageNumber: number;
    pageSize: number;
}