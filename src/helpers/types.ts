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
export interface fieldList {
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
export interface User {
    backgroundPictureUrl: string;
    city: City;
    confirmToken: string;
    confirmed: boolean;
    contactEmail: string;
    contactPhone: string;
    country: Country;
    errorConfirm: boolean;
    firstEntry: boolean;
    firstName: string;
    fullDescription: string;
    gender: string;
    id: number;
    lastName: string;
    login: string;
    loginType: string;
    nickName: string;
    openedForProposition: boolean;
    patronymic: string;
    pictureUrl: string;
    roles: Role[];
    shortDescription: string;
    userPictures: UserPicture[];
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
export interface Role {
    code: string;
    id: number;
    name: string;
}

export interface UserPicture {
    id: number;
    pictureUrl: string;
}
