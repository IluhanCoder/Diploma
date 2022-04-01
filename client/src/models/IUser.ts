export interface IUser {
    login : string
    email : string
    birthday : Date
    cell: string
    city: string
    gender: string
    avatar: string
    isActivated : boolean
    id : string
    eventInvites : Array<string>
}