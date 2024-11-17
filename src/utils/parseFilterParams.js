const parseContactType = (contactType) => {
    const isString = typeof contactType === "string";
    if (!isString) return;
    
    const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);
    if (isType(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
    const isString = typeof isFavourite === "string";
    if (!isString) return;

    const favourite = (isFavourite) => ['false', 'true'].includes(isFavourite);
    if (favourite(isFavourite)) return isFavourite;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedFavourite = parseFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedFavourite,
    };
};