
function parseType(value) {
    if (typeof value === "undefined") {
        return undefined; 
    }
   
    return value;
}


export function parseFilterParams(query) {
    const { type, isFavourite } = query;

   
    const parsedType = parseType(type);

    const parsedIsFavourite = typeof isFavourite === 'undefined' ? undefined : isFavourite === 'true'; 

    const filter = {};

   
    if (parsedType) {
        filter.contactType = parsedType; 
    }


    if (typeof parsedIsFavourite !== 'undefined') {
        filter.isFavourite = parsedIsFavourite; 
    }

    return filter;
}
