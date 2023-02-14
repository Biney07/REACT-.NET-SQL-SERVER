export interface Banori {
    id: number;
    name: string;
    biografia: string;
    price: number;
    pictureUrl: string;
    RelationshipStatus: string;
    profesioni: string;
    age: number;
}

export interface BanoriParams {
    orderBy: string;
    searchTerm?: string;
    profesionet: string[];
    pageNumber: number;
    pageSize: number;
}