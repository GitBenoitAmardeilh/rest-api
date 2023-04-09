export interface IContent{
    _id: string,
    idTable: string,
    [key: string]: string
}

export interface IContentValue{
    key: string, 
    type?: string, 
    value: string
}