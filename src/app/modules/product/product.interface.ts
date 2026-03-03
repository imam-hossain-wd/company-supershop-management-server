import { Types } from 'mongoose';


export type IProduct = {
    _id?: string;
    category: Types.ObjectId; 
    image: string;
    name: string;
    availability: boolean;
    netWeight: string;
    description: string;
    price: number;
    quantity: number;
}


export type IPaginationProps ={
    sortBy?: string;
    sortOrder?: string;
    page?:number;
    limit?:number;
}

export type IFiltersProps = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}