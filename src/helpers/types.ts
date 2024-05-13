export interface modalActionsList {
    name: string
    icon: string
    route?: string
    func?: Function
}

export interface skillList {
    title?: string
    name?: string
}
export default interface ComplaintData {
    resource: string;
    owner: string;
    code: number;
    severity: number;
    message: string;
}
export interface Country {
    id: string;
    name: string;
}

export interface City {
    id: string;
    name: string;
    countryId: string;
}

export interface CountryData {
    [key: string]: {
        name: string;
        cities: City[];
    };
}
