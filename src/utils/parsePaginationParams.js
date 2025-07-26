function parseNumber(value, defaultvalue){
    if (typeof value ==="undefined") {
        return defaultvalue;
    }
const parsedValue = parseInt(value);

if (Number.isNaN(parsedValue) === true){
    return defaultvalue;
}
return parsedValue;
}

export function parsePaginationParams(query){
const {page, perPage} = query;

const parsedPage = parseNumber(page, 1);
const parsedPerPage= parseNumber(perPage, 10);

return{
    page: parsedPage,
    perPage: parsedPerPage,
};

}