const isUserAllowed = (userRoles: string[], allowedRoles: string[] | string) => {
    if (allowedRoles == "all") {
        return true;
    } else if (typeof allowedRoles == "string") {
        return userRoles.includes(allowedRoles);
    } else if (Array.isArray(allowedRoles)) {
        return userRoles.some(role => allowedRoles.includes(role));
    }

    return false;
};
export default isUserAllowed;
