export interface IUSER {


    _id:string;

    createdAt: Date;
    updatedAt: Date;
    names:string;
    email: string;
    password:string;
    phoneNumber: string;
}



export type CreateUser = Omit<IUSER, '_id' | 'createdAt' | 'updatedAt'>;