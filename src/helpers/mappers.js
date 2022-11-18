import { DateTime } from "luxon";

export const mapInventoryFilter = (obj) => {
    const mappedObj = {};
    if (obj.categoryIds) mappedObj.category_id = obj.categoryIds;
    if (obj.pointIds) mappedObj.point_id = obj.pointIds;
    if (obj.dateStart || obj.dateEnd) {
        mappedObj.free_period = {};

        if (obj.dateStart)
            mappedObj.free_period.time_start = DateTime.fromJSDate(
                obj.dateStart
            ).toISO();
        if (obj.dateEnd)
            mappedObj.free_period.time_end = DateTime.fromJSDate(
                obj.dateEnd
            ).toISO();
    }

    return mappedObj;
};
