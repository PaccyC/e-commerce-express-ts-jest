

export interface  Category{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

export type CreateCategory = Omit<
Category,
'_id' | 'createdAt' | 'updatedAt'>;



export type UpdateCategory = Partial<Omit<
Category, "createdAt">>