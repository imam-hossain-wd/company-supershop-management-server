export const productSearchAbleFields: string[] = ['name', 'category', 'price'];

export const productFilterableFields: string[] = [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'category'
];


type productRelationalFieldsMapper = {
    [key: string]: string;
  };
  
 export const productRelationalFieldsMapper: productRelationalFieldsMapper = {
    category: 'category',
  };