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
