export interface IContent{
    _id?: string | undefined,
    [key: string]: string | undefined
}

export interface IContentValue{
    key: string, 
    type?: string, 
    option: string,
    content: string
}