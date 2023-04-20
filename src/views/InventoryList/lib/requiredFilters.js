import { isNil } from "@helpers";

export const checkRequiredFilters = (filter, requiredFilters) => {
    if (!Array.isArray(requiredFilters) || requiredFilters.length === 0)
        return true;

    if (
        requiredFilters.includes("point") &&
        (isNil(filter.pointIds) || filter.pointIds?.length === 0)
    )
        return false;
    if (
        requiredFilters.includes("category") &&
        (isNil(filter.categoryIds) || filter.categoryIds?.length === 0)
    )
        return false;
    if (requiredFilters.includes("dateStart") && isNil(filter.dateStart))
        return false;
    if (requiredFilters.includes("dateEnd") && isNil(filter.dateEnd))
        return false;

    return true;
};

export const getRequiredText = (filter, requiredFilters) => {
    if (!Array.isArray(requiredFilters) || requiredFilters.length === 0)
        return "";

    let str = "Выберите";

    if (
        requiredFilters.includes("point") &&
        (isNil(filter.pointIds) || filter.pointIds?.length === 0)
    )
        str += " точку проката,";
    if (
        requiredFilters.includes("category") &&
        (isNil(filter.categoryIds) || filter.categoryIds?.length === 0)
    )
        str += " категорию,";
    if (requiredFilters.includes("dateStart") && isNil(filter.dateStart))
        str += " дату начала,";
    if (requiredFilters.includes("dateEnd") && isNil(filter.dateEnd))
        str += " дату конца,";

    return str.slice(0, -1);
};
