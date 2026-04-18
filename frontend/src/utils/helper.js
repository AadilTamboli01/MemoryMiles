export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
        return words[0][0].toUpperCase();
    }

    return (
        words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
};


export const getEmptyCardMessage = (filterType) => {
   switch (filterType) {
        case "search":
            return `No stories matched your search. Try different keywords or explore something new! `

        case "date":
            return `No travel stories found for this date range. Try selecting different dates or start adding your memories! `

        default:
            return `Your travel journal is empty  
Start capturing your adventures, experiences, and unforgettable moments. Click 'Add' and begin your journey today! `
    }
}

// export const getEmptyCardMessage = (filterType) => {
    
// }