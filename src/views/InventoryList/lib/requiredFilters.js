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

export const getRequiredText = (filter, requiredFilters, trans) => {
    if (!Array.isArray(requiredFilters) || requiredFilters.length === 0)
        return "";

    let str = "";

    if (
        requiredFilters.includes("point") &&
        (isNil(filter.pointIds) || filter.pointIds?.length === 0)
    )
        str += ` ${trans["point_label_2"]},`;
    if (
        requiredFilters.includes("category") &&
        (isNil(filter.categoryIds) || filter.categoryIds?.length === 0)
    )
        str += ` ${trans["category_2"]},`;
    if (requiredFilters.includes("dateStart") && isNil(filter.dateStart))
        str += ` ${trans["date_start_2"]},`;
    if (requiredFilters.includes("dateEnd") && isNil(filter.dateEnd))
        str += ` ${trans["date_end_2"]},`;

    return str.slice(0, -1);
};
