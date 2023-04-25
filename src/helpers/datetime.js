import { Duration, DateTime } from "luxon";
import {
    startOfDay,
    startOfHour,
    startOfMinute,
    startOfSecond,
    startOfMonth,
    startOfYear,
} from "date-fns";
import humanizeDuration from "humanize-duration";

const humanizeSettings = {
    language: "ru",
    languages: {
        ru: {
            w: () => "неделя",
            d: () => "сутки",
            h: () => "часов",
            m: () => "минут",
        },
    },
    delimiter: " ",
    units: ["w", "d", "h", "m"],
};

const humanizeDurationISO = (isoDuration) => {
    const millis = Duration.fromISO(isoDuration).toMillis();
    return humanizeDuration(millis, humanizeSettings);
};

const humanizeDurationMillis = (millisDuration) => {
    return humanizeDuration(millisDuration, humanizeSettings);
};

const ISOtoMillis = (date) => {
    return DateTime.fromISO(date).toMillis();
};

const formatDateJs = (date, format = "dd.MM.yyyy HH:mm") => {
    return DateTime.fromJSDate(date).toFormat(format);
};

const formatDateISO = (date, format = "dd.MM.yyyy HH:mm") => {
    return DateTime.fromISO(date).toFormat(format);
};

const dateJsToISO = (date) => {
    return DateTime.fromJSDate(date).toISO();
};

const differenceDatesJs = (date1, date2) => {
    return date2 - date1;
};

const parseTimeString = (time) => {
    if (typeof time !== "string" || !time) return null;
    const [hours, minutes] = time.split(":");
    return {
        hours: Number(hours),
        minutes: Number(minutes),
    };
};

function compareDatesWithPrecision(
    date1,
    date2,
    getDateWithPrecision,
    compareDates
) {
    const roundedDate1 = getDateWithPrecision(date1);
    const roundedDate2 = getDateWithPrecision(date2);
    return compareDates(roundedDate1, roundedDate2);
}

export const compareDatesWithSecondPrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfSecond, compareDates);
};
export const compareDatesWithMinutePrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfMinute, compareDates);
};
export const compareDatesWithHourPrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfHour, compareDates);
};
export const compareDatesWithDayPrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfDay, compareDates);
};
export const compareDatesWithMonthPrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfMonth, compareDates);
};
export const compareDatesWithYearPrecision = (date1, date2, compareDates) => {
    return compareDatesWithPrecision(date1, date2, startOfYear, compareDates);
};

export {
    isAfter,
    isBefore,
    isEqual,
    parseISO,
    getMonth,
    getYear,
} from "date-fns";

// const humanizeDurationDate = (dateDuration) => {
//     const millis = Duration.from
// }

// isPastDate(date) {
//     if (this.filter.dateEnd !== "" && this.filter.dateEnd !== null) {
//         const momentCurrent = moment(date);
//         const momentDateEnd = moment(this.filter.dateEnd).set({
//             hour: 0,
//             minute: 0,
//         });
//         return momentCurrent.isAfter(momentDateEnd);
//     } else {
//         return false;
//     }
// },
// isFutureDate(date) {
//     if (
//         this.filter.dateStart !== "" &&
//         this.filter.dateStart !== null
//     ) {
//         const momentCurrent = moment(date);
//         const momentDateStart = moment(this.filter.dateStart).set({
//             hour: 0,
//             minute: 0,
//         });
//         return momentCurrent.isBefore(momentDateStart);
//     } else {
//         return false;
//     }
// },

export {
    humanizeDurationISO,
    formatDateJs,
    differenceDatesJs,
    humanizeDurationMillis,
    dateJsToISO,
    formatDateISO,
    ISOtoMillis,
    parseTimeString,
};
